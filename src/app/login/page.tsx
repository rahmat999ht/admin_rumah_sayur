"use client";

import { Card, CardHeader, CardBody, Button, Link } from "@nextui-org/react";
import { GoogleIcon } from "public/icons/GoogleIcon";
import { FreshaImage } from "public/images/FRESHA";
import React from "react";
// import

function LoginComponent() {
  return (
    <div
      className="centered-container mx-2 md:my-60 sm:my-10 flex flex-wrap content-center items-center justify-center gap-x-4 gap-y-10"
      // style={{ height: "100vh" }}
    >


      <Card className="gap-y-4 py-4">
        <CardHeader className="flex-col items-center gap-y-4 px-4 pb-0 pt-2">
          <h1 className="text-4xl font-bold">Get started for Admin Rumah Sayur</h1>
          <div>
            <small className="text-lg text-default-500">Continue with</small>
            <div className="flex items-center justify-center">
              <GoogleIcon />
              <h4 className="text-xl">oogle</h4>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Link
            className="centered-container justify-center"
            href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=31931713308-n9r9eup10m26f099mm1dovfijivklba4.apps.googleusercontent.com&scope=openid%20email%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle&state=qY7gg6AvY1NDohi-Gx0F0upiGaDz9BoVblrSuSxhB9k&code_challenge=ZlMoOhLp-PPP0ioRe1FQhX5p2kEp3W-uE1L80qe27wo&code_challenge_method=S256&service=lso&o2v=2&ddm=0&flowName=GeneralOAuthFlow"
          >
            <Button color="success">Login</Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}

export default LoginComponent;
