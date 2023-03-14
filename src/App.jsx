// component imports
import Navbar from './components/Navbar';
import ModelDescription from './components/ModelDescription';
import ThreeComponent from './components/ThreeComponent';
import PlanetSlider from './components/PlanetSlider';
import PerceptronButtons from './components/perceptronButtons';
import Preloader from './components/Preloader';

function App() {

  return (
    <div>
      <Preloader />
      <Navbar />
      <ThreeComponent />
      <ModelDescription />
      <PlanetSlider />
      <PerceptronButtons />
    </div>
  );
}

export default App;
