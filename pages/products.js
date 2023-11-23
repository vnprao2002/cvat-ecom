import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

// Lazy load components
const Header = lazy(() => import("@/components/Header"));
const Center = lazy(() => import("@/components/Center"));
const ProductsGrid = lazy(() => import("@/components/ProductsGrid"));
const Title = lazy(() => import("@/components/Title"));

// Styled components
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
    // Add focus styles if needed
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #000;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  border: none;
  background-color: #4c707d;
  color: #fff;
  border-radius: 50px;
  cursor: pointer;
`;

export default function ProductsPage({ products }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product && product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 75 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Center>
              <Title>Tất cả sản phẩm</Title>

              <SearchInput
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <ProductsGrid products={searchTerm ? filteredProducts : products} />
            </Center>
          </motion.div>
        </AnimatePresence>
      </Suspense>

      <ScrollToTopButton onClick={scrollToTop}>↑</ScrollToTopButton>
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
