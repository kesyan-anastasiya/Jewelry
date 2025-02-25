import React, { memo,  useState } from 'react';
import type { IDCollection, Jewelry } from '../type';
import ModalWindow from './ModalWindow';
import { useAppDispatch } from '../../../store/store';
import {   delJewelry } from '../adminSlice';
import StockMap from './StockMap';
import ModalWindowChangeJewelry from './ModalWindowChangeJewelry';

type Props = {
  jewelry: Jewelry;
  i: number;
};

function JewelryUno({ jewelry, i }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const [state, setState] = useState(false);
  const [modal, setModal] = useState(false);

  const deleteItem = (id: IDCollection): void => {
    dispatch(delJewelry(id)).catch(console.log);
  };

  return (
    <tr >
      <td>{i + 1}.</td>
      <td>{jewelry.name}</td>
      {/* <td>{jewelry.description}</td> */}
      {/* <td>{jewelry.price}</td> */}
      <td>{jewelry.Collection?.name}</td>
      <td>{jewelry.Type?.name}</td>
      <td>{jewelry.isNew ? 'Да' : 'Нет'}</td>
      <td>{jewelry.JewHashtags?.map((el) => <div key={el.id}>{el.Hashtag?.title}</div>)}</td>

      {jewelry.Stocks?.length ? (
        <td colSpan={2}>
          {jewelry.Stocks.map((el) => (
            <StockMap key={el.id} stock={el} isChange={false}/>
          ))}
        </td>
      ) : (
        <td colSpan={2} style={{textAlign: 'center'}}>Нет на складе</td>
      )}
      <td>{jewelry.Metall?.name}</td>
      <td>
        <ModalWindowChangeJewelry jewelry={jewelry} state={state} setState={setState} />
        <button type="button" onClick={() => setState(true)}>
          Изменить
        </button>
      </td>
      <td>
        <ModalWindow deleteItem={deleteItem} modal={modal} setModal={setModal} id={jewelry.id} />
        <button type="button" onClick={() => setModal(true)}>
          Удалить
        </button>
      </td>
    </tr>
  );
}

export default memo(JewelryUno);
