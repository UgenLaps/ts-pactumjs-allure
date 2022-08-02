import * as pactum from "pactum";
import {request, response, sleep, spec} from "pactum";
import * as dotenv from 'dotenv';
import * as path from 'path';
// import * as yaml from 'js-yaml';
// import * as fs from 'fs';
// // import { pjr } from "../../utils/pjr";
// import {Severity} from "jest-allure/dist/Reporter";
// import {setJsonLikeAdapter} from "pactum/src/exports/settings";
// import {ContentType, extendAllureBaseEnvironment} from "jest-circus-allure-environment";
// import {CreateAPIAttachmentReq, CreateAPIAttachmentRes} from "../../utils/creat_attachment";

const configFile = '.env';
declare const reporter: any;

dotenv.config({
    path: path.resolve(process.cwd(), configFile),
});


beforeEach(async () => {
    reporter
    .addEnvironment('REST API Testing Tool', 'PactumJS')
    .addEnvironment('PROD', `${process.env.BASE_URL}`)

})

beforeAll(async () => {
    request.setBaseUrl(`${process.env.BASE_URL}`);
    pactum.request.setDefaultTimeout(60000);
    // reporter.add(pjr as any);
    // spec().records('describe', describe);
});

afterEach(async () => {

    let resp


})

afterAll(async () => {
    // await mock.stop();
    // return reporter.end();
});