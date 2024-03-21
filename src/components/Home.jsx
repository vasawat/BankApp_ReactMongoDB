import Footer from "./Footer";
import MainApp from "./MainApp";
import NavBar from "./NavBar";
export default function Home(params) {
  return (
    <section className="App ">
      <NavBar />
      <MainApp />
      <Footer/>
    </section>
  );
}
