'use client';

import React, { useEffect, useMemo, useState } from "react";
import Table from '@/components/table';
import CryptoDetailModal from "@/components/crypt-detail-modal";
import { formatDate, formatPrice } from '@/utils';
import { postCryptoViewed } from '@/api/viewed-crypto'
import Link from "next/link";

/* This is a list of sorting order options */
const sortOrder = [{
  label: 'ASC',
  key: 'asc'
}, {
  label: 'DESC',
  key: 'desc'
}]

/* This is the home page */
export default function Home() {
  /* This is  use for user to input search term */
  const [search, setSearch] = useState('');

  /* This is use for selecting currency type */
  const [currency, setCurrency] = useState('USD');

  /* This is the list of last 50 cryptos */
  const [cryptoList, setCryptoList] = useState([]);

  /* This is use for setting the selected crypto data */
  const [modalData, setModalData] = useState<Record<string, any>>();

  /* This is use for determining if modal is open or not */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* This is use for selecting sort by and sort order */
  const [filter, setFilter] = useState({
    attr: 'market_cap',
    order: 'desc'
  })

  /*Fetches top 50 crypto currency list from coingecko api on basis of selected currency and set to state  */
  const fetchAndSetupCryptoData = async (currency: string = 'usd') => {
    try {
      const order = `${filter.attr}_${filter.order}`
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false`
      const res = await fetch(url);
      const data = await res.json();
      setCryptoList(data);
    } catch (err) {
      console.error('fetchAndSetupCryptoData. error', err);
      setCryptoList([]);
      window.alert('Unable to load cryptocurrency list!')
    }
  }

  // This calls everytime whenever currency changes 
  useEffect(() => {
    fetchAndSetupCryptoData(currency.toLowerCase())
  }, [currency])


  // Handler for changing search term
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value || '')
  }

  // Handler for  currency selector changes
  const onChangeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value)
  }

  // Creates a currency selector 
  const currencyList = useMemo(() => {
    const cList = [
      { name: 'United States Dollar', code: 'USD' },
      { name: 'Euro', code: 'EUR' },
      { name: 'Japanese Yen', code: 'JPY' },
      { name: 'British Pound Sterling', code: 'GBP' },
      { name: 'Australian Dollar', code: 'AUD' },
      { name: 'Canadian Dollar', code: 'CAD' },
      { name: 'Swiss Franc', code: 'CHF' },
      { name: 'Chinese Yuan Renminbi', code: 'CNY' },
      { name: 'Swedish Krona', code: 'SEK' },
      { name: 'New Zealand Dollar', code: 'NZD' },
      { name: 'Mexican Peso', code: 'MXN' },
      { name: 'Singapore Dollar', code: 'SGD' },
      { name: 'Hong Kong Dollar', code: 'HKD' },
      { name: 'Norwegian Krone', code: 'NOK' },
      { name: 'South Korean Won', code: 'KRW' },
      { name: 'Turkish Lira', code: 'TRY' },
      { name: 'Russian Ruble', code: 'RUB' },
      { name: 'Indian Rupee', code: 'INR' },
      { name: 'Brazilian Real', code: 'BRL' },
      { name: 'South African Rand', code: 'ZAR' },
      { name: 'Danish Krone', code: 'DKK' },
      { name: 'Polish Zloty', code: 'PLN' },
      { name: 'Thai Baht', code: 'THB' },
      { name: 'Indonesian Rupiah', code: 'IDR' },
      { name: 'Philippine Peso', code: 'PHP' },
      { name: 'Czech Koruna', code: 'CZK' },
      { name: 'Hungarian Forint', code: 'HUF' },
      { name: 'Malaysian Ringgit', code: 'MYR' },
      { name: 'Romanian Leu', code: 'RON' },
      { name: 'Israeli New Shekel', code: 'ILS' },
      { name: 'Saudi Riyal', code: 'SAR' },
      { name: 'UAE Dirham', code: 'AED' },
      { name: 'Vietnamese Dong', code: 'VND' },
      { name: 'Colombian Peso', code: 'COP' },
    ];

    return (
      <select
        className="border-1 border-gray-300 p-2 rounded-md text-black"
        id="currency-list"
        value={currency}
        onChange={onChangeCurrency}
      >
        {
          cList.map((__c) => {
            return <option key={__c.code} value={__c.code}>{__c.name}</option>
          })
        }

      </select>
    )
  }, [currency]);


  // Handler for opening modal
  const onModalOpenClick = (data: Record<string, any>) => {
    setIsModalOpen(true);
    setModalData(data)
  }

  // Handler for closing modal
  const onModalClose = () => {
    setIsModalOpen(false);
    setModalData(undefined)
  }

  // Calculates and create columns list for table
  const columns = useMemo(() => {

    return [{
      header: 'Logo',
      headerKey: 'image',
      customComponet: (val: string) => {
        return (
          <img
            className="h-[32rem"
            style={{
              height: '60px',
              width: '60px'
            }}
            src={val}

          />
        )
      }
    }, {
      header: 'Name',
      headerKey: 'name'
    }, {
      header: 'Market Cap Rank',
      headerKey: 'market_cap_rank',

    }, {
      header: 'Market Cap',
      headerKey: 'market_cap',
      formatter: (val: number) => formatPrice(val, currency)
    }, {
      header: 'Price',
      headerKey: 'current_price',
      formatter: (val: number) => formatPrice(val, currency)
    }, {
      header: 'Last Updated',
      headerKey: 'last_updated',
      formatter: (val: string) => formatDate(val)
    }]
  }, [currency]);


  // Dropdown for selecting sort by 
  const orderByList = useMemo(() => {

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter(prev => ({
        ...prev,
        attr: e.target.value
      }))
    }

    return (
      <select
        className="border-1 border-gray-300 p-2 rounded-md text-black"
        id="order-by-list"
        value={filter.attr}
        onChange={onChange}
      >
        {
          columns.map((__c) => {
            return <option key={__c.headerKey} value={__c.headerKey}>{__c.header}</option>
          })
        }

      </select>
    )

  }, [filter, columns])



  // Dropdown for selecting sort order 
  const orderList = useMemo(() => {

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter(prev => ({
        ...prev,
        order: e.target.value
      }))
    }

    return (
      <select
        className="border-1 border-gray-300 p-2 rounded-md text-black"
        id="order-list"
        value={filter.order}
        onChange={onChange}
      >
        {
          sortOrder.map((__c) => {
            return <option key={__c.key} value={__c.key}>{__c.label}</option>
          })
        }

      </select>
    )
  }, [filter])


  // Building data on the basis of search term and filter selected
  const filteredCrypto = useMemo(() => {
    return cryptoList.filter((crypto: { name: string }) => {
      let {
        name
      } = crypto;
      let nameLow = (name || '').toLowerCase();
      let searchLow = (search || '').toLowerCase();
      if (nameLow.includes(searchLow)) {
        return true;
      }
      return false;
    }).sort((a, b) => {
      if (a[filter.attr] > b[filter.attr]) {
        return filter?.order == 'desc' ? -1 : 1;
      } else if (a[filter.attr] < b[filter.attr]) {
        return filter?.order == 'desc' ? 1 : -1;
      }
      return 0;
    });
  }, [search, cryptoList, filter]);

  // Handler for table row selector
  const onRowSelect = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    // console.log('onRowSelect ',e)
    postCryptoViewed(e)
    onModalOpenClick(e)

  }

  // Renderer for home page

  return (
    <div className="flex flex-1 h-full items-center p-10 flex-col">
      <h1
        className=" font-bold text-2xl text-white"
      >Cryptocurry Listing
      </h1>
      <div
        className="flex mt-10 flex-1 flex-col bg-white w-full p-5 shadow-xl rounded-md h-full overflow-auto"
      >
        <div
          className="flex w-full gap-4"
        >
          <div className="flex-1">
            <h3 className="font-medium">Search</h3>
            <input
              className="flex border-1 border-gray-300 p-2 rounded-md w-full text-black mt-1"
              type='text'
              value={search}
              placeholder=""
              onChange={onChangeSearch}
            />
          </div>

          <div>
            <h3 className="font-medium mb-1">Currency</h3>
            {currencyList}
          </div>
          <div>
            <h3 className="font-medium mb-1">Sort By</h3>
            {orderByList}
          </div>
          <div>
            <h3 className="font-medium mb-1">Sort Order</h3>
            {orderList}
          </div>
        </div>
        
        <div
          className="flex-1 mt-5 max-h-full overflow-auto h-full "
        >
          <Table
            columns={columns}
            data={filteredCrypto}
            onRowClick={onRowSelect}
          />
        </div>
        <div
          className="flex  w-full justify-end mt-5"
        >
          <a href="/recent-crypto" className="underline hover:text-blue-500">
            View top 10 recent viewed cryptocurrency
          </a>


        </div>
      </div>
      <CryptoDetailModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        data={modalData}
      />
    </div>
  );
}
