import React, { memo, useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import type { Metall } from '../type';
import MetallUno from './MetallUno';
import { addMetall } from '../adminSlice';

type Props = {
  metalls: Metall[];
};

function AddMetall({ metalls }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const [nameCollection, setNameCollection] = useState('');
  const [message, setMessage] = useState('');

  const addCollectionForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (nameCollection) {
      dispatch(addMetall({ name: nameCollection })).catch(console.log);
      setNameCollection('');
      setMessage('');
    } else {
      setMessage('Заполните описание');
    }
  };

  return (
    <div>
      <div className="textH1">Добавить материал</div>
      <form onSubmit={addCollectionForm} className="collectionAdd">
        <input
          name="name"
          type="text"
          placeholder="Материал"
          value={nameCollection}
          onChange={(e) => setNameCollection(e.target.value)}
        />
        <button className="btnAdmin" type="submit">
          Добавить
        </button>
        <div className="messageErooor">{message}</div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>№</th>
            <th>Название</th>
            <th>Изменить</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {metalls.slice(1).map((el, i) => (
            <MetallUno metall={el} i={i} key={el.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(AddMetall);
