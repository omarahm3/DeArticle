import { cp } from "shelljs";


cp('-R', 'src/views', 'dist/')
cp('-R', 'config', 'dist/')
cp('-R', 'duden', 'dist/')