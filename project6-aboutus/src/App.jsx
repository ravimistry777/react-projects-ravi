import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import AboutGlowing from './components/Aboutglowing/AboutGlowing';
import Details from './components/Details-section2/Details';
import Photos from './components/2photos/Photos';
import Team from './components/Team/Team';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <AboutGlowing />
      <Details />
      <Photos />
      <Team />
      <Footer />
    </div>
  );
}

export default App;