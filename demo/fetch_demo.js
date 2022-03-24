
// async function getUrl(url){
//   const res = await fetch(url, {
//     method: 'GET',
//     mode: 'no-cors'
//   })
//   const data = await res.json()
//   return data
// }

// const getSwr = async (url)=>{
//   console.log('url', url)
//   const option = {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     mode: 'no-cors'
//   }
//   const data = useSWR(
//     url, 
//     async (url) => {
//       const res = await fetch(url, {
//         method: 'GET',
//         mode: 'no-cors'
//       })
//       const data = await res.json()
//       return data
//     })
//   console.log('data', data)
//   return  data
// }


async function upload(url, data) {
    // const body = new URLSearchParams();
    // for (var key in data) {
    //     body.append(key, data[key]);
    // }
    
    // const a = await (await fetch(url, {
    //     method: 'post',
    //     body: body,
    //     // mode: 'no-cors'
    // })
    // )
    // options.body = body
    //     console.log('data', data, typeof(data))
        await (
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                mode: 'no-cors'
            })
            // await fetch(requestUrl, options)
        )
    
    // var options = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   method: 'POST',
    //   mode: 'no-cors'
    // };
  
    // options.body = new FormData();
    // for (var key in data) {
    //     console.log('data.key', key)
    //     options.body.append(key, data[key]);
    // }
    // console.log('options.body', options.body)
    // for(var pair of options.body.entries()) {
    //     console.log(`body. ${pair[0]}: ${pair[1]}`);
    //   }
      
    // options.body = body
    // console.log('data', data, typeof(data))
    // await (
    //     // await fetch(requestUrl, {
    //     //     method: 'POST',
    //     //     headers: { 'Content-Type': 'application/json' },
    //     //     body: JSON.stringify(data),
    //     //     mode: 'no-cors'
    //     // })
    //     await fetch(requestUrl, options)
    // )

    // return fetch(requestUrl, options)
    // .then(response => {
    // //   return response.json()
    // //     .then(responseJson => {
    // //       //You put some checks here
    // //       return responseJson;
    // //     });
    // });
}

