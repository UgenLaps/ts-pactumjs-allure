import * as pactum from "pactum";
import {request, response, sleep, spec} from "pactum";
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import "../../utils/setup_and_teardown";
import {globalResponse} from  "../../utils/resp"
import {Severity} from "jest-allure/dist/Reporter";
import {setJsonLikeAdapter} from "pactum/src/exports/settings";
import {ContentType, extendAllureBaseEnvironment} from "jest-circus-allure-environment";
import {CreateAPIAttachmentReq, CreateAPIAttachmentRes} from "../../utils/creat_attachment";

const configFile = '.env';
declare const reporter: any;

describe ('Booking', () => {

    let test_data;

    try {
        test_data = yaml.load(fs.readFileSync(`${__dirname}/${process.env.ENV}.yml`, 'utf8'));
    } catch (e) {
        console.log(e);
    }

    it(`[bk-1] GET /ping`, async () => {

        reporter.story("Booking")

        globalResponse.resp = await spec()
            .name(`bk-2 /ping`)
            .get(`/ping`)
            .expectStatus(201)
            .expectBodyContains("Created")
            .returns(ctx => ({res: ctx.res, req: ctx.req}));

    })

    it(`[bk-2] POST /auth`, async () => {

        reporter.story("Auth")

        globalResponse.resp = await spec()
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
    })

    it(`[bk-3] POST /booking`, async () => {

        reporter.story("Booking")

        globalResponse.resp = await spec()
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
    })

    it(`[bk-4] PUT /booking{id}`, async () => {

        reporter.story("Booking")

        globalResponse.resp = await spec()
            .put(`/booking/$S{bookingid}`)
            .withHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=$S{token}`
            })
            .withBody(
                test_data.bookingPut
            )
            .expectStatus(200)
            .returns(ctx => ({res: ctx.res, req: ctx.req}));
    })

    it(`[bk-5] PATCH /booking{id}`, async () => {

        reporter.story("Booking")

        globalResponse.resp = await spec()
            .patch(`/booking/$S{bookingid}`)
            .withHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=$S{token}`
            })
            .withBody(
                test_data.bookingPatch
            )
            .expectStatus(200)
            .returns(ctx => ({res: ctx.res, req: ctx.req}));
    })

    it(`[bk-6] GET /booking/{id}`, async () => {

        reporter.story("Booking")

        globalResponse.resp = await spec()
            .get(`/booking/$S{bookingid}`)
            .withHeaders({
                'Accept': 'application/json'
            })
            .expectStatus(200)
            .returns(ctx => ({res: ctx.res, req: ctx.req}));

    })

    it(`[bk-7] DELETE /booking/{id}`, async () => {

        reporter.story("Booking")

        globalResponse.resp = await spec()
            .delete(`/booking/$S{bookingid}`)
            .withHeaders({
                'Content-Type': 'application/json',
                'Cookie': `token=$S{token}`
            })
            .expectStatus(201)
            .expectBodyContains("Created")
            .returns(ctx => ({res: ctx.res, req: ctx.req}));
    })
})
