import './App.css';
import ImageCompare from './components/ImageCompare';


function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Before / After Comparison</h1>
      <ImageCompare />
    </div>
  );
}

export default App;
