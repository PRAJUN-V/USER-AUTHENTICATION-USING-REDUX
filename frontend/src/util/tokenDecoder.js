function decodeJWT(token) {
    console.log('token in decoder',token)
    const [header, payload, signature] = token.split('.');
    console.log('header',header)
    console.log('payload',payload)
    console.log('signature',signature)

    
    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));
    
    return { header: decodedHeader, payload: decodedPayload  };
  }
  

export default decodeJWT