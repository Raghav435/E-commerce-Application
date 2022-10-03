import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsApi } from "../store/Products/Products.action";
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Link } from "react-router-dom";

function Rating({ rating, numReviews }){
    return (
      <Flex d="flex" alignItems="center">
        {Array(5)
          .fill('')
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: '1' }}
                  color={i < rating ? 'teal.500' : 'gray.300'}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
            }
            return <BsStar key={i} style={{ marginLeft: '1' }} />;
          })}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {numReviews} review{numReviews > 1 && 's'}
        </Box>
      </Flex>
    );
  }

export default function ProductCard({
    id,
  img_responsive_src,
  product_brand,
  product_strike,
  product_discountPercentage,
  product_ratingsContainer,
  product_product,
}) {
  const products = useSelector((state) => state.products.filteredItems);
  // console.log(products);

  const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getProductsApi());
//   }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentpages = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const pageCount = Math.ceil(products.length / productsPerPage);

  // console.log(currentpages);

  let pageNumberArray = [];
  for (let i = 0; i < pageCount; i++) {
    pageNumberArray[i] = (
      <Box className={currentPage == i + 1 ? "page-item active" : "page-item"}>
        <Button className="page-link" onClick={() => setCurrentPage(i + 1)}>
          {i + 1}
        </Button>
      </Box>
    );
  }
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Link to={`/product/${id}`}>
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${img_responsive_src})`,
            filter: "blur(10px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(10px)",
            },
          }}
        >
          <Image
            rounded={"md"}
            height={230}
            width={282}
            // objectFit=''
            // objectFit={"contain"}
            src={img_responsive_src}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {product_brand}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {product_product}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={600} fontSize={"xl"}>
            ₹ {product_strike}
            </Text>
            <Text color={"gray.600"}>
              {product_discountPercentage}
            </Text>
           
          </Stack>
          {/* <Flex justifyContent="space-between" alignContent="center"> */}
            <Rating style={{display:"flex"}} rating={product_ratingsContainer} numReviews={product_ratingsContainer.numReviews} />
            {/* <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              <Box as="span" color={'gray.600'} fontSize="lg"> */}
                {/* £
              </Box> */}
              {/* {product_strike.toFixed(2)} */}
            {/* </Box> */}
          {/* </Flex> */}
        </Stack>
        </Link>
      </Box>
    </Center>
  );
}
