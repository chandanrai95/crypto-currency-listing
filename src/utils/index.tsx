export function formatPrice(value: number, currency: string = 'USD') {
  let formattedValue;

  if (value >= 1000000000000) {
    formattedValue = (value / 1000000000000).toFixed(2) + 'T';
  } else if (value >= 1000000000) {
    formattedValue = (value / 1000000000).toFixed(2) + 'B';
  } else if (value >= 1000000) {
    formattedValue = (value / 1000000).toFixed(2) + 'M';
  } else if (value >= 1000) {
    formattedValue = (value / 1000).toFixed(2) + 'K';
  } else {
    formattedValue = value;
  }

  return `${formattedValue} ${currency}`;
}

export function formatDate(dateStr: string) {
  try {
    const opt: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      second: 'numeric',
      minute: 'numeric',
      hour12: true
    }
    const date = new Date(dateStr).toLocaleDateString('en-US', opt);
    return date
  } catch (err) {
    return ''
  }
}

export function formatCurrency(value: number, currencyCode: string, locale = 'en-US') {
  if (!currencyCode) {
    return 0
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}


export const getTableColumns = ({ currency }: { currency: string }) => [{
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
  formatter: (val: number) => formatCurrency(val, currency)
}, {
  header: 'Market Cap 24h%',
  headerKey: 'market_cap_change_percentage_24h',
  customComponet: (val: number) => {
    let isProfit = val > 0 ;
    let iconColor = val > 0 ? 'text-[#13C783]' : 'text-[#EA3943]';
    let formattedVal = Math.abs(val).toFixed(2)
    return (
      <div
        className="flex flex-row items-center justify-center"
      >
        <span className={`${iconColor}`}>{`${isProfit ? '▲' : '▼'}`}</span>
        <span className={`${iconColor} ml-1`}>{`${formattedVal}%`}</span>
      </div>
    )
  }
}, {
  header: 'Price',
  headerKey: 'current_price',
  formatter: (val: number) => formatCurrency(val, currency)
}, {
  header: '24h%',
  headerKey: 'price_change_percentage_24h',
  customComponet: (val: number) => {
    let isProfit = val > 0 ;
    let iconColor = val > 0 ? 'text-[#13C783]' : 'text-[#EA3943]';
    let formattedVal = Math.abs(val).toFixed(2)
    return (
      <div
        className="flex flex-row items-center justify-center"
      >
        <span className={`${iconColor}`}>{`${isProfit ? '▲' : '▼'}`}</span>
        <span className={`${iconColor} ml-1`}>{`${formattedVal}%`}</span>
      </div>
    )
  }
}, {
  header: 'Volume',
  formatter: (val: Record<string, any>) => {
    const {
      symbol,
      total_volume
    } = val
    return formatPrice(total_volume, symbol).toUpperCase();
  }
}, {
  header: 'Supply',
  customComponet: (val: Record<string, any>) => {

    const {
      symbol,
      total_supply,
      circulating_supply
    } = val
    let perc = (((circulating_supply) / total_supply) * 100).toFixed(2)
    let formatedTotalS = formatPrice(total_supply, symbol).toUpperCase();
    let formatedCirculatingS = formatPrice(circulating_supply, symbol).toUpperCase();
    return (

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
          <span>Circulating : {formatedCirculatingS}</span> <br />
          <span>Percentage : {`${perc}%`}</span>
        </div>
      </div>)
  }
}, {
  header: 'Last Updated',
  headerKey: 'last_updated',
  formatter: (val: string) => formatDate(val)
}]