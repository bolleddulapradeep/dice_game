import ReactDOM from 'react-dom/client'
import { App } from './App';
import { DiceProvider } from './DiceContext/DiceProvider';
import './App.css'


const dom = ReactDOM.createRoot(document.getElementById('root'));

dom.render(<DiceProvider><App /></DiceProvider>)