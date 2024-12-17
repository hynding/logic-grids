// import { CodeBreakerGame } from '../../../logic-grids-ts/dist/web/bundle.js';
import { CodeBreakerGame } from 'logic-grids';

fetch('../../data-path.txt').then(response => response.text()).then(dataPath => {
    new CodeBreakerGame(`../../${dataPath}/languages/en/words/en-words-common.json`)
})