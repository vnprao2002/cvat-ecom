import { useState } from "react";
import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { motion, AnimatePresence } from "framer-motion";

// Styled component for the search input
const SearchInput = styled.input`
  @media (min-width: 768px) {
    order: 1; 
    margin-left: auto; 
  }
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 16px;
  border: 0.3px solid #000;
  background-color: #fff; 
  width: 50; 
  &:focus {

`;

export default function ProductsPage({ products }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on the search term (case-insensitive)
  const filteredProducts = products.filter((product) =>
    product && product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Center>
            <Title>Tất cả sản phẩm</Title>

            {/* Search bar */}
            <SearchInput
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Display filtered or all products based on the search term */}
            <ProductsGrid products={searchTerm ? filteredProducts : products} />
          </Center>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
