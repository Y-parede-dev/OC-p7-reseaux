const myHeaders = new Headers();

const myInit = { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 cache: 'default' };
export const GetPost = async(url, setIsLoaded, setItems) => {
  const req = await fetch(url, myInit)
    .then(res => res.json())
    .then(
      (result) => {
      setItems(result.result);
      setIsLoaded(true)
      } 
    )
    return req
  }

  // get comment
export const GetComment = async(url, setComments, setIsLoaded, setError) => {
  const req = await fetch(url, myInit)
      .then(res => res.json())
      .then(
      (result) => {
          setIsLoaded(true);
          setComments(result.result);
      },
    
      (error) => {
          setIsLoaded(true);
          setError(error);
      }
  )
  return req;
};