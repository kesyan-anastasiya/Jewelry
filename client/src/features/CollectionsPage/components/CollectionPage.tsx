import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import JewelryCard from '../../JewelrysPage/components/JewelryCard';
import { useAppDispatch, type RootState } from '../../../store/store';
import { initSpecificCollection, setSearchHashtags } from '../specificCollectionSlice';
import { initHashtag, initTypes, nitMetalls } from '../../JewelrysPage/jewelrysSlice';


function CollectionPage(): JSX.Element {
  const { collectionID } = useParams();
  const dispatch = useAppDispatch();

  const [typeFilter, setTypeFilter] = useState('');
  const [typeMetall, setTypeMetall] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    if (collectionID) {
      dispatch(initSpecificCollection(+collectionID)).catch(console.log);
      dispatch(nitMetalls()).catch(console.log);
      dispatch(initTypes()).catch(console.log);
      dispatch(initHashtag()).catch(console.log);
    }
  }, [collectionID, dispatch]);

  const query = useSelector((store: RootState) => store.specificCollectionState.searchHashtags);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchHashtags(e.target.value));
  };

  const specificCollectionSelect = useSelector((store: RootState) => store.specificCollectionState.jewelrysSpecificCollection);
  const jewelrysMetalls = useSelector((store: RootState) => store.adminState.metalls);
  const jewelrysTypes = useSelector((store: RootState) => store.adminState.types);


  const filteredJewelrysCollection = specificCollectionSelect.filter(jewelry => {
    
    const matchesPrice =
      (!minPrice || jewelry.price >= +minPrice) && (!maxPrice || jewelry.price <= +maxPrice);
    const matchesType = !typeFilter || jewelry.Type.id === +typeFilter;
    const matchesMetall = !typeMetall || jewelry.Metall.id === +typeMetall;
    const matchesHashtags = query
      ? jewelry.JewHashtags.filter((hashtags) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          hashtags.Hashtag.title.toLowerCase().includes(query.toLowerCase()),
        ).length > 0
      : true;

    return  matchesPrice && matchesType && matchesMetall && matchesHashtags;
  });


  return (
    <div className="list">
      <div className="filterCSS">
      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Цена от..."
      />
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Цена до..."
      />
      <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
        <option value="">Тип</option>
        {jewelrysTypes.map((jewelry) => (
          <option key={jewelry.id} value={jewelry.id}>
            {jewelry.name}
          </option>
        ))}
      </select>
      <select value={typeMetall} onChange={(e) => setTypeMetall(e.target.value)}>
        <option value="">Металл</option>
        {jewelrysMetalls.map((jewelry) => (
          <option key={jewelry.id} value={jewelry.id}>
            {jewelry.name}
          </option>

        ))}
      </select>

        <input type="text" value={query} onChange={handleSearch} placeholder="Поиск украшений..." />
      </div>
      {filteredJewelrysCollection.length === 0 ? (
        <p>Такого украшения нет</p>
      ) : (
        filteredJewelrysCollection.map(jewelry => (
          <JewelryCard key={jewelry.id} jewelry={jewelry} />
        ))
      )}
    </div>
  );
}

export default CollectionPage;