import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

function FavoritesItem({ favorite }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const categoryList = useSelector((store) => store.categoryReducer);

  useEffect(() => {
    dispatch({ 
      type: 'GET_CATEGORIES' 
    }); 
  }, []);

  const changeCategory = (categoryId) => {
    dispatch({
      type: 'POST_GIF',
      payload: { 
        categoryId: categoryId, 
        id: favorite.id 
      },
    });
    setAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Card elevation={4}>
        <CardActionArea>
          <Box paddingTop={2} paddingLeft={2} paddingRight={2}>
            <img src={favorite.image_url} />
          </Box>
        </CardActionArea>
        <CardContent>
          <Box minHeight={25}>
            <Typography variant="body1" align="center">
              {favorite.name}
            </Typography>
          </Box>
        </CardContent>
        <Box display="flex" alignItems="center" justifyContent="center">
          <CardActions>
            <Button color="primary" onClick={handleOpenMenu}>
              Categories
            </Button>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => changeCategory(null)}>
                <em>No Category</em>
              </MenuItem>
              {categoryList.map((categoryItem) => {
                return (
                  <MenuItem onClick={() => changeCategory(categoryItem.id)}>
                    {categoryItem.name}
                  </MenuItem>
                );
              })}
            </Menu>
          </CardActions>
        </Box>
      </Card>
    </>
  );
}

export default FavoritesItem;