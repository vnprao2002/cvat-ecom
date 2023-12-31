import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 700;
  color: #323232;
`;

export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>Sản phẩm mới</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
