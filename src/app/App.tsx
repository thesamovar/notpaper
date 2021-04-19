import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import PaperPicker from 'src/features/paperPicker/PaperPicker';
import {getActivePaperId} from 'src/features/paperPicker/paperPickerSlice';
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
