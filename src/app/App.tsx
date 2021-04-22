import {useSelector} from 'react-redux';
import PaperPicker from 'src/features/paper/PaperPicker';
import {getActivePaperId} from 'src/features/paper/paperSlice';
import Reader from 'src/features/reader/Reader';

/*
 * Entrypoint
 */
function App() {
	const hasActivePaper = !!useSelector(getActivePaperId)

  return (
    <div>
			{
				hasActivePaper ? (
					<Reader />
				) : (
					<PaperPicker />
				)
			}
    </div>
  );
}

export default App;
