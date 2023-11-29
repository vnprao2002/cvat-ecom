import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { motion, AnimatePresence } from "framer-motion";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px 10px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);
  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
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
              <ColumnsWrapper>
                <Box>
                  <h1>Thanks for your order!</h1>
                  <p>We will email you when your order will be sent.</p>
                </Box>
              </ColumnsWrapper>
            </Center>
          </motion.div>
        </AnimatePresence>
      </>
    );
  }
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
            <ColumnsWrapper>
              <Box>
                <h2>Giỏ hàng</h2>
                {!cartProducts?.length && <div>Giỏ hàng bạn đang trống!</div>}
                {products?.length > 0 && (
                  <Table>
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th style={{ padding: "0 15px" }}>Giá tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id}>
                          <ProductInfoCell>
                            <ProductImageBox>
                              <img src={product.images[0]} alt="" />
                            </ProductImageBox>
                            {product.title}
                          </ProductInfoCell>
                          <td>
                            <Button
                              onClick={() => lessOfThisProduct(product._id)}
                            >
                              -
                            </Button>
                            <QuantityLabel style={{ padding: "5px 0px" }}>
                              {
                                cartProducts.filter((id) => id === product._id)
                                  .length
                              }
                            </QuantityLabel>
                            <Button
                              onClick={() => moreOfThisProduct(product._id)}
                            >
                              +
                            </Button>
                          </td>
                          <td style={{ fontWeight: "700", padding: "15px" }}>
                            {cartProducts.filter((id) => id === product._id)
                              .length * product.price}
                            đ
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td style={{ fontWeight: "700", padding: "10px" }}>
                          {total}đ
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                )}
              </Box>
              {!!cartProducts?.length && (
                <Box>
                  <h2>Thông tin đặt hàng</h2>
                  <Input
                    type="text"
                    placeholder="Tên"
                    value={name}
                    name="name"
                    onChange={(ev) => setName(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                  <CityHolder>
                    <Input
                      type="text"
                      placeholder="Thành phố"
                      value={city}
                      name="city"
                      onChange={(ev) => setCity(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Số điện thoại"
                      value={postalCode}
                      name="postalCode"
                      onChange={(ev) => setPostalCode(ev.target.value)}
                    />
                  </CityHolder>
                  <Input
                    type="text"
                    placeholder="Địa chỉ"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Quốc gia"
                    value={country}
                    name="country"
                    onChange={(ev) => setCountry(ev.target.value)}
                  />
                  <Button black block onClick={goToPayment}>
                    Đặt hàng
                  </Button>
                </Box>
              )}
            </ColumnsWrapper>
          </Center>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
