import {useSelector} from 'react-redux';
import PaperPicker from 'src/features/paper/PaperPicker';
import {getActivePaperId} from 'src/features/paper/paperSlice';
import Reader from 'src/features/reader/Reader';

/*
 * App Entrypoint
 *
 * Renders the Reader if a paper has been selected, otherwise a PaperPicker so the user can select a paper
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
