import app from './app';
import { getPort } from './config';

const PORT = getPort();
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`REST API server ready at: http://localhost:${PORT || ''}`));
