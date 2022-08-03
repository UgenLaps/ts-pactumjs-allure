import * as pactum from "pactum";
import {request, response, sleep, spec} from "pactum";
import * as dotenv from 'dotenv';
import * as path from 'path';
import { globalResponse } from './resp'
import {CreateAPIAttachmentReq, CreateAPIAttachmentRes} from './creat_attachment'
import { ContentType } from "jest-circus-allure-environment";

const configFile = '.env';
declare const reporter: any;

dotenv.config({
    path: path.resolve(process.cwd(), configFile),
});


beforeEach(async () => {
    globalResponse.resp = null;
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
    const { resp } = globalResponse
    reporter.addAttachment('request', CreateAPIAttachmentReq(resp['req']), ContentType.JSON);
    reporter.addAttachment('response', CreateAPIAttachmentRes(resp['res']), ContentType.JSON);

})