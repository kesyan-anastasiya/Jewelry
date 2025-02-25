import React, { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

import { Route, Routes, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Main from '../features/Main/Main';

import type { RootState } from '../store/store';
import { useAppDispatch } from '../store/store';
import { checked } from '../features/Auth/authSlice';
import {
  initCollectionsHome,
  initFavorites,
  initJewelrys,
} from '../features/JewelrysPage/jewelrysSlice';
import HomePage from '../features/HomePage/components/HomePage';
import AdminPage from '../features/Admin/components/AdminPage';
import JewelrysPage from '../features/JewelrysPage/components/JewelrysPage';

import JewelryPage from '../features/JewelrysPage/components/JewelryPage';
import AddCustomJewelery from '../features/AddCustomJewelery/components/AddCustomJewelery';
import NewPage from '../features/NewPage/components/NewPage';
import CollectionsPage from '../features/CollectionsPage/components/CollectionsPage';
import CollectionPage from '../features/CollectionsPage/components/CollectionPage';
import AboutUs from '../features/aboutUs/components/AboutUs';
import BasketPage from '../features/Basket/components/BasketPage';
import BelowFiveThousandPage from '../features/BelowFiveThousand copy/components/BelowFiveThousandPage';
import LocationsPages from '../features/location/components/LocationsPages';
import PersonalAreaPages from '../features/PersonalArea/components/PersonalAreaPages';
import { initSizes } from '../features/Admin/adminSlice';
import { initBasket } from '../features/Basket/basketSlice';
import FavoritesPage from '../features/Favorites/components/FavoritesPage';
import TypesPage from '../features/Types/Types';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.authState.user);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(initJewelrys()).catch(console.log);
    dispatch(checked()).catch(console.log);
    dispatch(initCollectionsHome()).catch(console.log);
    dispatch(initSizes()).catch(console.log);
  }, []);

  useEffect(() => {
    if (user && user.isAdmin) {
      navigate('/admin');
    }
    if (user) {
      dispatch(initBasket()).catch(console.log);
      dispatch(initFavorites()).catch(console.log);
    }
  }, [user]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<HomePage />} />
          <Route path="jewelry" element={<JewelrysPage />} />
          <Route path="jewelry/:id" element={<JewelryPage />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="collections/:collectionID" element={<CollectionPage />} />
          <Route path="new" element={<NewPage />} />
          <Route path="below-five-thousand" element={<BelowFiveThousandPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="application" element={<AddCustomJewelery />} />
          <Route path="location" element={<LocationsPages />} />
          <Route path="personalArea" element={<PersonalAreaPages />} />
          <Route path="basket" element={<BasketPage />} />
          <Route path="types/:id" element={<TypesPage />} />
        </Route>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
