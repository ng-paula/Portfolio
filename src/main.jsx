import { createRoot } from 'react-dom/client';
import './styles/base.css';
import App from './App';
import './styles/responsive.css'; // last, so breakpoints override section styles

createRoot(document.getElementById('root')).render(<App />);
