import React, { MouseEventHandler, useMemo } from "react";
import Modal from "../modal";
import { formatCurrency, formatDate, formatPrice } from "@/utils";

const rowClassName = 'flex flex-1 border-1 border-gray-300';
const headingClassName = 'flex-1 text-center border-r-1 p-2 border-gray-300 font-bold';
const headingRightClassName = 'flex-1 text-center p-2 border-gray-300 font-bold';
const textClassName = 'flex-1 text-md text-center border-r-1 p-2 border-gray-300 font-semibold';
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
    label: 'Market Cap Change (24h)',
    key: 'market_cap_change_24h',
    customComponent: (val: number) => {
      let color = val > 0 ? '#13C783' : '#EA3943';
      let iconColor = val > 0 ? 'text-[#13C783]' : 'text-[#EA3943]';
      let isProfit = val > 0
      let formattedVal = formatPrice(Math.abs(val), 'USD')
      return (
        <div
          className={`flex flex-row items-center justify-center ${textRightClassName}`}
        >
          <span className={`${iconColor} ml-1`}>{`${isProfit ? '▲' : '▼'} ${formattedVal}`}</span>
        </div>
      )
    }

  }, {
    label: 'Current Price',
    key: 'current_price',
    isNumber: true
  }, {
    label: 'Price Change (24h)',
    key: 'price_change_24h',
    customComponent: (val: number) => {
      let iconColor = val > 0 ? 'text-[#13C783]' : 'text-[#EA3943]';
      let isProfit = val > 0
      let formattedVal = formatPrice(Math.abs(val), 'USD')
      return (
        <div
          className={`flex flex-row items-center justify-center ${textRightClassName}`}
        >
          <span className={`${iconColor} ml-1`}>{`${isProfit ? '▲' : '▼'} ${formattedVal}`}</span>
        </div>
      )
    }
  }, {
    label: 'Highest Price (24)',
    key: 'high_24h',
    isNumber: true
  }, {
    label: 'Lowest Price In (24h)',
    key: 'low_24h',
    isNumber: true
  }, {
    label: 'Volume',
    // key: 'total_volume',
    formatter: (val: Record<string, any>) => {
      const {
        symbol,
        total_volume
      } = val
      return formatPrice(total_volume, symbol).toUpperCase();
    }
  },
  {
    label: 'Supply',
    customComponent: (val: Record<string, any>) => {
      console.log('------', val)
      const {
        symbol,
        total_supply,
        circulating_supply
      } = val
      let perc = (((circulating_supply) / total_supply) * 100).toFixed(2)
      let formatedTotalS = formatPrice(total_supply, symbol).toUpperCase();
      let formatedCirculatingS = formatPrice(circulating_supply, symbol).toUpperCase();
      return (
        <div className={textRightClassName}>
          
            <div
              className="w-[200px] rounded-xl h-[20px] bg-[rgba(0,0,0,0.5)] relative group inline-block cursor-pointer"
            >
              <div
                className={`rounded-xl h-full bg-black `}
                style={{
                  width: `${perc}%`
                }}
              >
              </div>

              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
              opacity-0 group-hover:opacity-100 
              transition bg-gray-800 text-white text-sm 
              px-3 py-1 rounded pointer-events-none z-10 whitespace-nowrap">
                <span>Total : {formatedTotalS}</span> <br />
                <span>Circulating : {formatedCirculatingS}</span>
              </div>
            </div>
            <span className="ml-1">{`${perc}%`}</span>
        </div>
      )
    }
  },
  {
    label: 'Last Updated At',
    key: 'last_updated',
    formatter: (str: string | number | undefined) => formatDate(String(str))
  }]


const CryptoDetailModal = ({
  isOpen,
  onClose,
  data,
  currency = 'USD'
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
      leftHeader={() => (
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
        </div>)}
    >

      <div
        className="flex-1 flex-col w-100"
      >
        <div
          className="flex-1 flex-col border-1 rounded-sm border-gray-300 mt-2"
        >
          <div className={rowClassName}><h1 className={headingClassName}>Attributes </h1> <div className={'w-3'} /> <h1 className={headingRightClassName}>Value </h1></div>
          {
            attributesList.map((attr, idx) => {
              const {
                key,
                label,
                formatter,
                customComponent
              } = attr || {}
              let val = data && key ? data[key] || '' : data || '';
              
              if (customComponent) {
                return (
                  <div className={rowClassName} key={`${key || label}_${idx}`}>
                    <h1 className={textClassName}>{label}</h1>
                    <div className={'w-3'} />
                    {customComponent(val)}
                  </div>
                )

              }
              let formattedVal = attr?.isNumber ? formatCurrency(parseInt(val ? String(val) : '0'), currency) : val;
              if (formatter) {
                formattedVal = formatter(formattedVal)
              }
              return (
                <div className={rowClassName} key={`${key || label}_${idx}`}><h1 className={textClassName}>{label}</h1> <div className={'w-3'} /> <span className={textRightClassName}>{formattedVal}</span></div>
              )
            })
          }
        </div>
      </div>
    </Modal>
  )
}

export default CryptoDetailModal