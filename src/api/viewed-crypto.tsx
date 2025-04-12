
export const postCryptoViewed = async(params: Record<string, any>) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/viewed-crypto`
    const postCrypto = await fetch(url,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })

    const result = await postCrypto.json();
    return result
  } catch (err) {
    return Promise.reject(err)
  }
}