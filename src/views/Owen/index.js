import React, { useState, useEffect } from 'react';
import { database } from '_firebase';

import Form from 'components/app/form';
import Ledgers from 'components/app/ledgers';
import Total from 'components/app/total';
import SignOut from 'components/app/signOut';
import useAuth from 'hooks/useAuth';

const Owen = () => {
  const [activeLedger, setActiveLedger] = useState(null);
  const [ledgers, setLedgers] = useState([]);
  const { getUserInfo } = useAuth();
  const { userId, userName, email } = getUserInfo();

  const createNewUser = () => {
    database.ref(`users/${userId}`).set({
      name: userName,
      email,
    });
  };

  const addLedgersSuscription = () => {
    database.ref('ledgers').on('value', (snapshot) => {
      const dataValue = snapshot.val();
      if (dataValue) {
        const newLedgers = Object.keys(dataValue).map(key => ({
          ...dataValue[key],
          id: key,
        }));
        setLedgers(newLedgers);
      }
    });
  };

  const addActiveLedgerSuscription = () => {
    database
      .ref('users')
      .child(userId)
      .on('value', (snapshot) => {
        const user = snapshot.val();
        if (user) {
          const newActiveLedger = ledgers.find(
            ({ id }) => id === user.activeLedger,
          );
          setActiveLedger(newActiveLedger);
        } else {
          createNewUser(userId);
        }
      });
  };

  useEffect(addLedgersSuscription);
  useEffect(addActiveLedgerSuscription, [ledgers]);

  return (
    <div className='container' style={{ padding: '1rem' }}>
      <div className='flex-between'>
        <SignOut />
        <Ledgers activeLedger={activeLedger} ledgers={ledgers} />
      </div>
      {activeLedger && <Total total={activeLedger.total} />}
      {activeLedger && <Form activeLedger={activeLedger} />}
    </div>
  );
};

export default Owen;
