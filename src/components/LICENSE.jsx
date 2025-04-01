import React from "react";
import { Card } from "antd";

const LicenseInfo = () => {
  const licenses = [
    {
      name: "Ant Design",
      copyright: "Copyright (c) 2015-present Ant UED",
      license: "MIT License",
    },
    {
      name: "React",
      copyright: "Copyright (c) Facebook, Inc.",
      license: "MIT License",
    },
    {
      name: "@ant-design/icons",
      copyright: "Copyright (c) 2018-present Ant UED",
      license: "MIT License",
    },
    {
      name: "Tailwind CSS",
      copyright: "Copyright (c) Tailwind Labs, Inc.",
      license: "MIT License",
    },
    {
      name: "@radix-ui/react-select",
      copyright: "Copyright (c) 2022 WorkOS",
      license: "MIT License",
    },
    {
      name: "Vite",
      copyright: "Copyright (c) 2019-present Evan You & Vite Contributors",
      license: "MIT License",
    },
    {
      name: "Day.js",
      copyright: "Copyright (c) 2018-present, iamkun",
      license: "MIT License",
    },
    {
      name: "React Spinners",
      copyright: "Copyright (c) 2016 David Hu",
      license: "MIT License",
    },
    {
      name: "Socket.IO Client",
      copyright: "Copyright (c) 2014-2021 Automattic",
      license: "MIT License",
    },
    {
      name: "UUID",
      copyright:
        "Copyright (c) 2010-2020 Robert Kieffer and other contributors",
      license: "MIT License",
    },
    {
      name: "Axios",
      copyright:
        "Copyright (c) 2014-present Matt Zabriskie & Axios Contributors",
      license: "MIT License",
    },
    {
      name: "Autoprefixer",
      copyright: "Copyright 2013 Andrey Sitnik",
      license: "MIT License",
    },
    {
      name: "Lodash-es",
      copyright: "Copyright OpenJS Foundation and other contributors",
      license: "MIT License",
    },
    {
      name: "Prettier",
      copyright: "Copyright © James Long and contributors",
      license: "MIT License",
    },
    {
      name: "ESLint",
      copyright: "Copyright OpenJS Foundation and other contributors",
      license: "MIT License",
    },
    {
      name: "PubSub-js",
      copyright: "Copyright (c) 2010-2014 Morgan Roderick",
      license: "MIT License",
    },
    {
      name: "React DOM",
      copyright: "Copyright (c) Facebook, Inc. and its affiliates",
      license: "MIT License",
    },
    {
      name: "React Intl",
      copyright: "Copyright (c) 2019 Format.JS",
      license: "MIT License",
    },
    {
      name: "React Router DOM",
      copyright: "Copyright (c) React Training 2015-2019",
      license: "MIT License",
    },
    {
      name: "Reactjs Social Login",
      copyright: "Copyright (c) 2021 MaxwellZu",
      license: "MIT License",
    },
    {
      name: "Svelte",
      copyright: "Copyright (c) 2016-2021 Svelte Contributors",
      license: "MIT License",
    },
    {
      name: "vConsole",
      copyright: "Copyright (c) 2017 Tencent",
      license: "MIT License",
    },
    {
      name: "TypeScript",
      copyright: "Copyright (c) Microsoft Corporation",
      license: "Apache License 2.0",
    },
    {
      name: "Yarn",
      copyright: "Copyright (c) 2016-present Yarn Contributors",
      license: "BSD 2-Clause License",
    },
    {
      name: "Node.js",
      copyright:
        `Copyright (c) Node.js Contributors\n` +
        `Copyright Joyent, Inc. and other Node contributors`,
      license: " MIT License",
    },
    {
      name: "Adobe Fonts (Web Version)",
      copyright: " Copyright (c) Adobe Systems Incorporated ",
      license:
        " Adobe Fonts Subscription License \n Usage requires active Adobe Creative Cloud subscription with Fonts service ",
    },
    {
      name: "otp-timer-ts ",
      copyright: " Copyright 2022 siamahnaf ",
      license: " MIT License ",
    },
    {
      name: "jsqr",
      copyright: " Copyright 2004 Cosmo Wolfe ",
      license: " Apache-2.0",
    },
  ];
  return (
    <div className="w-full ">
      <div className="p-6">
        <div className="mb-4">
          <div className=" font-bold">Copyright (c) [2024] [SportsArt]</div>
          <p className="mt-2">
            This software includes the following third-party packages:
          </p>
        </div>

        <div className="space-y-4">
          {licenses.map((item, index) => (
            <div key={index} className="border-b pb-2 last:border-b-0">
              <p className="font-semibold">{`${index + 1}. ${item.name}`}</p>
              <p className=" text-gray-600">{item.copyright}</p>
              <p className=" text-gray-600">{`Licensed under ${item.license}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LicenseInfo;
