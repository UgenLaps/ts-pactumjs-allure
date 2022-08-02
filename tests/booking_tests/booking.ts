import * as pactum from "pactum";
import {request, response, sleep, spec} from "pactum";
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as sat from "../../utils/setup_and_teardown";
// import { pjr } from "../../utils/pjr";
import {Severity} from "jest-allure/dist/Reporter";
import {setJsonLikeAdapter} from "pactum/src/exports/settings";
import {ContentType, extendAllureBaseEnvironment} from "jest-circus-allure-environment";
import {CreateAPIAttachmentReq, CreateAPIAttachmentRes} from "../../utils/creat_attachment";

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

describe ('Booking', () => {

    let test_data;

    try {
        test_data = yaml.load(fs.readFileSync(`${__dirname}/${process.env.ENV}.yml`, 'utf8'));
    } catch (e) {
        console.log(e);
    }

    // pjr.file = `${test_data.network}-report.json`;
    // pjr.path = '../ts-pactumjs-allure/reports';

    it(`[bk-1] GET /ping`, async () => {

        reporter.story("Booking")

        const resp = await spec()
            .name(`bk-2 /ping`)
            .get(`/ping`)
            .expectStatus(201)
            .expectBodyContains("Created")
            .returns(ctx => ({res: ctx.res, req: ctx.req}));

        console.log('>>>>>>>>>>>', resp['res']);

        reporter.addAttachment('request', CreateAPIAttachmentReq(resp['req']), ContentType.JSON);
        reporter.addAttachment('response', CreateAPIAttachmentRes(resp['res']), ContentType.JSON);

    })

    it(`[bk-2] POST /auth`, async () => {

        reporter.story("Auth")

        const resp = await spec()
            .post(`/auth`)
            .withHeaders({
                'Accept': 'application/json'
            })
            .withBody(
                test_data.signIn
            )
            .expectStatus(200)
            .stores("token", "token")
            .returns(ctx => ({res: ctx.res, req: ctx.req}));

        console.log('>>>>>>>>>>>', resp['res']);

        reporter.addAttachment('request', CreateAPIAttachmentReq(resp['req']), ContentType.JSON);
        reporter.addAttachment('response', CreateAPIAttachmentRes(resp['res']), ContentType.JSON);
    })

    it(`[bk-3] POST /booking`, async () => {

        reporter.story("Booking")

        const resp = await spec()
            .post(`/booking`)
            .withHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .withBody(
                test_data.bookingPost
            )
            .expectStatus(200)
            .stores("bookingid", "bookingid")
            .returns(ctx => ({res: ctx.res, req: ctx.req}));

        console.log('>>>>>>>>>>>', resp['res']);

        reporter.addAttachment('request', CreateAPIAttachmentReq(resp['req']), ContentType.JSON);
        reporter.addAttachment('response', CreateAPIAttachmentRes(resp['res']), ContentType.JSON);
    })

    it(`[bk-4] PUT /booking`, async () => {

        reporter.story("Booking")

        const resp = await spec()
            .post(`/booking`)
            .withHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .withBody(
                test_data.bookingPut
            )
            .expectStatus(200)
            .returns(ctx => ({res: ctx.res, req: ctx.req}));

        console.log('>>>>>>>>>>>', resp['res']);

        reporter.addAttachment('request', CreateAPIAttachmentReq(resp['req']), ContentType.JSON);
        reporter.addAttachment('response', CreateAPIAttachmentRes(resp['res']), ContentType.JSON);
    })

    it(`[bk-5] PATCH /booking`, async () => {

        reporter.story("Booking")

        const resp = await spec()
            .post(`/booking`)
            .withHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .withBody(
                test_data.bookingPut
            )
            .expectStatus(200)
            .returns(ctx => ({res: ctx.res, req: ctx.req}));

        console.log('>>>>>>>>>>>', resp['res']);

        reporter.addAttachment('request', CreateAPIAttachmentReq(resp['req']), ContentType.JSON);
        reporter.addAttachment('response', CreateAPIAttachmentRes(resp['res']), ContentType.JSON);
    })

    it(`[bk-6] GET /booking/{id}`, async () => {

        reporter.story("Booking")

        const resp = await spec()
            .name(`bk-2 /booking/$S{bookingid}`)
            .get(`/booking/$S{bookingid}`)
            .withHeaders({
                'Accept': 'application/json'
            })
            .expectStatus(200)
            .returns(ctx => ({res: ctx.res, req: ctx.req}));

        console.log('>>>>>>>>>>>', resp['res']);

        reporter.addAttachment('request', CreateAPIAttachmentReq(resp['req']), ContentType.JSON);
        reporter.addAttachment('response', CreateAPIAttachmentRes(resp['res']), ContentType.JSON);

    })

    it(`[bk-7] DELETE /booking/{id}`, async () => {

        reporter.story("Booking")

        const resp = await spec()
            .name(`bk-5 /booking/$S{bookingid}`)
            .delete(`/booking/$S{bookingid}`)
            .withHeaders({
                'Content-Type': 'application/json',
                'Cookie': `token=$S{token}`
            })
            .expectStatus(201)
            .expectBodyContains("Created")
            .returns(ctx => ({res: ctx.res, req: ctx.req}));

        console.log('>>>>>>>>>>>', resp['res']);

        reporter.addAttachment('request', CreateAPIAttachmentReq(resp['req']), ContentType.JSON);
        reporter.addAttachment('response', CreateAPIAttachmentRes(resp['res']), ContentType.JSON);

    })
})