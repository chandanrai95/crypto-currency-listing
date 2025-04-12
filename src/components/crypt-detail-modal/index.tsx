import React, { MouseEventHandler, useMemo } from "react";
import Modal from "../modal";
import { formatDate, formatPrice } from "@/utils";

const rowClassName = 'flex flex-1 border-1 border-gray-300';
const headingClassName = 'flex-1 text-center border-r-1 p-2 border-gray-300 font-bold';
const headingRightClassName = 'flex-1 text-center p-2 border-gray-300 font-bold';
const textClassName = 'flex-1 text-md text-center border-r-1 p-2 border-gray-300'
const textRightClassName = 'flex-1 text-md text-center p-2 border-gray-300'

interface CryptoDetailModalProps {
  isOpen: boolean,
  onClose?: MouseEventHandler<HTMLButtonElement>,
  data?: Record<string, any>,
  currency?: string
}

const attributesList = [
  //   {
  //   label: 'Name',
  //   key: 'name',
  // }, 
  {
    label: 'Market Cap Rank',
    key: 'market_cap_rank'
  }, {
    label: 'Market Cap',
    key: 'market_cap',
    isNumber: true
  }, {
    label: 'Market Cap Change In 24 Hours',
    key: 'market_cap_change_24h',
  }, {
    label: 'Current Price',
    key: 'current_price',
    isNumber: true
  }, {
    label: 'Price Change In 24 hours',
    key: 'price_change_24h',
    isNumber: true
  }, {
    label: 'Highest Price In 24 hours',
    key: 'high_24h',
    isNumber: true
  }, {
    label: 'Lowest Price In 24 hours',
    key: 'low_24h',
    isNumber: true
  }, , {
    label: 'Last Updated At',
    key: 'last_updated',
    formatter: (str: string | number | undefined) => formatDate(String(str))
  }]


const CryptoDetailModal = ({
  isOpen,
  onClose,
  data,
  currency
}: CryptoDetailModalProps) => {

  const name = useMemo(() => {
    return data?.name || ''
  }, [data])

  const imageUrl = useMemo(() => {
    return data?.image || ''
  }, [data])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >

      <div
        className="flex-1 flex-col w-100"
      >
        <div
          className="flex items-center"
        >
          <img
            className="h-[32rem"
            style={{
              height: '60px',
              width: '60px'
            }}
            src={imageUrl}

          />
          <h1
            className="font-bold text-xl ml-2"
          >
            {name}
          </h1>
        </div>
        <div
          className="flex-1 flex-col border-1 rounded-sm border-gray-300 mt-2"
        >
          <div className={rowClassName}><h1 className={headingClassName}>Attributes </h1> <div className={'w-3'} /> <h1 className={headingRightClassName}>Value </h1></div>
          {
            attributesList.map(attr => {
              const {
                key = 'abc',
                label,
                formatter
              } = attr || {}
              let val = data ? data[key] || '' : '';
              let formattedVal = attr?.isNumber ? formatPrice(parseInt(val ? String(val) : '0'), currency) : val;
              if (formatter) {
                formattedVal = formatter(formattedVal)
              }
              return (
                <div className={rowClassName}><h1 className={textClassName}>{label}</h1> <div className={'w-3'} /> <span className={textRightClassName}>{formattedVal}</span></div>
              )
            })
          }
        </div>
      </div>
    </Modal>
  )
}

export default CryptoDetailModal