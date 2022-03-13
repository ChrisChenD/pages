

export async function getServerSideProps(context) {
    const data = await (
      await fetch("http://127.0.0.1:5000/hello_text", {})
    ).text();
    // const data = await (
    //   await fetch("http://127.0.0.1:5000/hello_json", {})
    // ).json();

    if (!data) {
      return {
        notFound: true,
      }
    }
    return {
      // props: { 'data':res.keys() }, // will be passed to the page component as props
      props: { 'data':data }, // will be passed to the page component as props
    }
  }

function Home({data}) {
  return <div>
    <p>flask: ret</p>
    <p>text: [{data}]</p>
    {/* <p>json.name: [{data.name}]</p> */}
  </div>
}
export default Home;