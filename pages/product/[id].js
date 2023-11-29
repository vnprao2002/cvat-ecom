import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exist={{ opacity: 0, y: 50 }}
          transition={{ delay: 0.3 }}
        >
          <Center>
            <ColWrapper>
              <WhiteBox>
                <ProductImages images={product.images} />
              </WhiteBox>
              <div>
                <Title>{product.title}</Title>
                <p style={{ textAlign: "justify" }}>{product.description}</p>
                <PriceRow>
                  <div>
                    <Price style={{ fontWeight: "700" }}>
                      {product.price}đ
                    </Price>
                  </div>
                  <div>
                    <Button primary onClick={() => addProduct(product._id)}>
                      <CartIcon />
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                </PriceRow>
              </div>
            </ColWrapper>
          </Center>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
