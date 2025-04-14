'use client';
import { postCryptoViewed } from "@/api/viewed-crypto";
import CryptoDetailModal from "@/components/crypt-detail-modal";
import Table from "@/components/table";
import { formatCurrency, formatDate, formatPrice, getTableColumns } from "@/utils";
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

  /* This is use for setting the selected crypto data */
  const [modalData, setModalData] = useState<Record<string, any>>();

  /* This is use for determining if modal is open or not */
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const onModalOpenClick = (data: Record<string, any>) => {
    setIsModalOpen(true);
    setModalData(data)
  }

  // Handler for closing modal
  const onModalClose = () => {
    setIsModalOpen(false);
    setModalData(undefined)
  }

  const onRowSelect = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    postCryptoViewed(e)
    onModalOpenClick(e)

  }

  const columns = useMemo(() => {
    return getTableColumns({ currency: 'USD' })
  }, []);

  const formatedData = useMemo(() => {
    return cryptos.map((el: { meta_data: Object }) => el.meta_data);
    // return []
  }, [cryptos])

  return (
    <div className="flex flex-1 h-full items-center p-10 flex-col">
      <h1 className="font-bold text-2xl text-white">Top 10 Recent Viewed Cryptocurrency</h1>

      <div
        className="flex mt-10 flex-1 flex-col bg-white w-full p-5 shadow-xl rounded-md h-full overflow-auto"
      >
        <div
          className="flex-1 mt-10 max-h-full overflow-auto h-full "
        >
          {
            loading && (
              <div className="w-full text-center">loading ...</div>
            ) || (
              (formatedData || []).length == 0 && (
                <div className="w-full text-center">Content is not available</div>
              ) || (
                <Table
                  columns={columns}
                  data={formatedData}
                  onRowClick={onRowSelect}
                />
              )
            )
          }

        </div>
      </div>

      <CryptoDetailModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        data={modalData}
        currency={'USD'}
      />
    </div>
  );
};


export default RecentCrypto