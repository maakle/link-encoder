import React, { useState } from "react";
import { useToasts } from 'react-toast-notifications'
import Head from "next/head";

export default function Home() {
  const { addToast } = useToasts()
  const [link, setLink] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [encodedLink, setEncodedLink] = useState("");

  const encodeVerificationLink = (event) => {
    event.preventDefault();
    const prefillAttributes = {
      prefill_attributes: {
        email: userEmail,
      },
    };
    const objJsonStr = JSON.stringify(prefillAttributes);
    const objJsonB64 = Buffer.from(objJsonStr).toString("base64");
    const encodedLink = link + "/?p=" + objJsonB64;
    setEncodedLink(encodedLink);
    navigator.clipboard.writeText(encodedLink);
    addToast('Copied to clipboard', { appearance: 'success' })
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/passbase-logo.svg"
            alt="Workflow"
          ></img>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Passbase Email Encoder
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Get started by filling out the two fields below.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={encodeVerificationLink}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Personal Verification Link
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    placeholder="http://verify.passbase.com/example"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setLink(e.target.value)}
                  ></input>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Email
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    placeholder="user@email.com"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setUserEmail(e.target.value)}
                  ></input>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Encode & Copy to Clipboard
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Result</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Encoded Link
              </label>
              <div className="mt-1">
                <textarea
                  value={encodedLink}
                  required
                  readOnly
                  rows="3"
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
