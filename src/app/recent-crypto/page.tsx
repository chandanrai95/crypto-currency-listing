'use client';
import Table from "@/components/table";
import { formatDate, formatPrice } from "@/utils";
import React, { useEffect, useMemo, useState } from "react";

interface Crypto {
  meta_data: Record<string, any>;
}

interface RecentCrypto {
  cryptos: Crypto[];
}

const RecentCrypto = () => {
  const [cryptos, setCryptos] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentCrypto = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recent-crypto?resultsPerPage=10&page=1&sortBy=updated_at`);
        const json = await res.json();
        setCryptos(json);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentCrypto();
  }, []);

  const onRowSelect = (e: React.MouseEvent<HTMLTableRowElement>) => {

  }

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
      formatter: (val: number) => formatPrice(val, 'USD')
    }, {
      header: 'Price',
      headerKey: 'current_price',
      formatter: (val: number) => formatPrice(val, 'USD')
    }, {
      header: 'Last Updated',
      headerKey: 'last_updated',
      formatter: (val: string) => formatDate(val)
    }]
  }, []);

  const formatedData = useMemo(() => {
    return cryptos.map((el: { meta_data: Object }) => el.meta_data);
  }, [cryptos])

  return (
    <div className="flex flex-1 h-full items-center p-10 flex-col">
      <h1 className="font-bold text-2xl text-white">Top 10 Recent Viewed Cryptocurrency</h1>
      {/* <pre className="text-white mt-4 text-sm">
        {JSON.stringify(cryptos, null, 2)}
      </pre> */}
      <div
        className="flex mt-10 flex-1 flex-col bg-white w-full p-5 shadow-xl rounded-md h-full overflow-auto"
      >
        <div
          className="flex-1 mt-10 max-h-full overflow-auto h-full "
        >
          <Table
            columns={columns}
            data={formatedData}
            onRowClick={onRowSelect}
          />
        </div>
      </div>
    </div>
  );
};


export default RecentCrypto