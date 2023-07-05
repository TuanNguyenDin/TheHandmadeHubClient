import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Product = ({ item }) => {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const getProduct = async ({id}) => {
    try {
      const res = await publicRequest.get("/products/find/" + id);
      setProduct(res.data);
    } catch {}
  };

  return (
    <Card sx={{ maxWidth: 345, minWidth: 300 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={item.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/product/${item._id}`}>
          <Button size="small"> Xem </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Product;
