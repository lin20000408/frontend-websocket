import React from "react";
import {
  MAIN_COLOR,
  MAX_VERTICAL_WIDTH,
  MAX_VERTICAL_HEIGHT,
  BACKGROUND_COLOR,
  DARKBLACK_COLOR,
} from "@/constants";
import LicenseInfo from "@/components/LICENSE";
//zh-tw字體 font-['Open_Sans']
//!four pages start
export function AboutZh() {
  return (
    <div className="font-['Open_Sans'] text-[14rem] text-[#000000]">
      <p className="">
        <div className="text-[14rem] font-bold text-[#000000]">
          關於PowrPlus科技{" "}
        </div>

        <br></br>
        <div className="text-[calc(14rem)]">
          PowrPlus™
          是一款智慧健身管理軟體系統。簡單直覺的使用者介面和程式邏輯為您提供愉快有趣的鍛鍊之旅，同時有效實現您的健康目標。
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="text-[calc(14rem)]">特徵： </div>
        <br />

        <div className="text-[calc(14rem)]">
          Powrplus™ 您可以手動記錄您的力量鍛鍊資料以進行追蹤。
        </div>
        {/* <div className="text-[calc(14rem)]"></div> */}
      </p>
    </div>
  );
}
export function ContactZh() {
  return (
    <div className="flex flex-col items-center">
      <div
        className="mt-[17.1rem] text-[calc(20rem)] font-black font-bold text-mainColor"
        style={{ letterSpacing: "1.5rem" }}
      >
        聯絡我們
      </div>
      <div className="mt-[11.3rem]  text-[calc(15rem)] font-bold  ">北美</div>
      <div>8217 44th AVE W Suite A</div>
      <div> Mukilteo, WA 98275</div>
      <div>
        電話: 800-709-1400 <span className="text-mainColor">//</span> 傳真:
        425-488-8155
      </div>
      <div>信箱: info@gosportsart.com</div>
      <div className="mb-44 mt-0 text-mainColor">
        ...........................
      </div>
      <div className="font-bold">歐洲、中東與非洲</div>
      <div> Strada Cantonale 42</div>
      <div>CH - 6534 San Vittore | Switzerland</div>
      <div>
        電話: +41 91 8273908 <span className="text-mainColor">//</span> 傳真:
        +41 91 8273910
      </div>
      <div>信箱: info.emea@gosportsart.com</div>
      <div className="mb-44 mt-0 text-mainColor">
        ...........................
      </div>
      <div className="font-bold">台灣</div>
      <div>台灣台南市工環路 11 號</div>

      <div>
        電話: +886 6-3840888 <span className="text-mainColor">//</span> 傳真:
        +886 6-3840998
      </div>
      <div className="pb-5 ">信箱: info@sportsart.com.tw</div>
      <div className="mb-44 mt-0 "></div>
    </div>
  );
}
export function TermsAndPrivacyZh() {
  return (
    <div>
      <p className="text-[14rem] font-bold  ">服務條款與隱私政策 </p>

      <p className="text-[12rem] font-semibold italic ">
        最後更新時間：2024年10月{" "}
      </p>
      <br></br>
      <p className="text-[14rem] font-bold "> 介紹 </p>
      <div>
        SportsArt PowrPlus 是由 SportsArt.com
        提供的一個平台，允許用戶通過其網站和移動應用程序來跟踪、管理和分享健身活動。本《服務條款》（“條款”）規範您對
        PowrPlus 的使用，同時也包含我們的《隱私政策》。{" "}
      </div>
      <br></br>
      <div>
        通過訪問或使用 PowrPlus
        服務（“服務”），您同意遵守這些條款，並確認您已閱讀、理解並接受了《隱私政策》。如果您不同意這些條款，您將無權使用本服務。這些條款可能會隨時進行修改，若在更改後繼續使用服務，則視為您已接受這些更改。{" "}
      </div>
      <br></br>
      <div className="text-[14rem] font-bold">服務使用 </div>
      <div>
        服務包含各種形式的數字內容（“內容”），如軟件、文本、圖片和數據，這些內容受版權法保護。除非根據這些條款許可，否則您不得使用這些內容。任何未經授權的使用，包括出售或複製內容，將立即導致您對服務的訪問權限被終止。{" "}
      </div>
      <br />
      <div>
        PowrPlus 上通過提供的第三方商標和內容並未受到 SportsArt
        的認可。您需要對如何使用這些外部內容負責，且不得在未經授權的情況下使用第三方商標。服務僅限於個人使用，除非
        SportsArt
        明確授權，否則禁止商業用途。禁止的活動包括但不限於未經請求的電子郵件收集以及使用網絡爬蟲技術。{" "}
      </div>
      <br></br>
      <div className="text-[14rem] font-bold">年齡限制 </div>
      <div>
        您必須年滿13歲才能使用本服務。如果發現您未滿13歲，您的帳戶將在無需通知的情況下被終止。
      </div>
      <br></br>
      <div className="text-[14rem] font-bold">終止 </div>
      <div>
        SportsArt
        保留隨時因任何原因終止您對服務的訪問權利，包括違反這些條款的情況。{" "}
      </div>
      <br></br>
      <br></br>
      <div className="text-[14rem] font-bold">PowrPlus 隱私政策 </div>
      <br></br>
      <div className="text-[14rem] font-bold">信息收集 </div>
      <div>SportsArt 可能通過 PowrPlus 平台收集各類信息，包括： </div>
      <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
        <li style={{ listStyle: "disc" }}>
          個人數據：包括姓名、電子郵件、電話號碼、IP地址、設備標識符、位置信息和健身信息（例如身高、體重）。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          設備和瀏覽數據：包括操作系統、瀏覽器類型、訪問的頁面和交易詳情。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          自動收集：通過 cookies、網絡信標和集成 PowrPlus
          的健身設備的定位服務收集數據。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          第三方數據：可能從合作夥伴和服務提供商處收集的信息。{" "}
        </li>
      </ul>

      <div className="font-bold  ">我們如何收集信息 </div>
      <div className="font-bold  ">SportsArt 通過以下方式收集信息：</div>
      <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
        <li style={{ listStyle: "disc" }}>
          直接來自您：通過網站或應用程序上的表單，例如帳戶創建或客戶支持互動。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          自動方式：通過 cookies 和其他追蹤技術來監控您的瀏覽行為。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          第三方：來自參與提供服務的合作夥伴或服務提供商的信息。{" "}
        </li>
      </ul>

      <div className="font-bold  ">信息的使用 </div>
      <div className="font-bold  ">您的信息可能會用於： </div>
      <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
        <li style={{ listStyle: "disc" }}>提供和改進 PowrPlus 服務。 </li>
        <li style={{ listStyle: "disc" }}>回應查詢並管理您的帳戶。 </li>
        <li style={{ listStyle: "disc" }}>傳達更新和通知。 </li>
        <li style={{ listStyle: "disc" }}>分析您的使用模式以增強用戶體驗。 </li>
        <li style={{ listStyle: "disc" }}>
          必要時與 SportsArt 的合作夥伴和服務提供商共享信息。{" "}
        </li>
      </ul>

      <div className="font-bold  ">信息披露 </div>
      <div className="font-bold  ">
        SportsArt 不會將個人數據出售給第三方。然而，我們可能會披露信息：
      </div>
      <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
        <li style={{ listStyle: "disc" }}>
          給協助運營 PowrPlus 的承包商和服務提供商。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          在發生業務交易（例如合併或收購）時。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          依法履行法律義務，例如回應法院命令或執法請求。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          保護 SportsArt 或其他用戶的權利、財產或安全。{" "}
        </li>
      </ul>

      <div className="font-bold  ">數據安全與隱私 </div>
      <div className="font-bold  ">
        我們致力於確保用戶數據的安全性，並採取了一系列技術和組織措施來保護您的個人信息，包括：
      </div>
      <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
        <li style={{ listStyle: "disc" }}>
          加密技術：我們使用標準的加密技術（如 SSL/TLS）來保護傳輸中的數據安全。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          訪問權限控制：我們嚴格限制個人數據的訪問，只有授權人員才能訪問特定情況下的數據。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          數據洩露通知：如發生數據洩露，我們將根據適用法律及時通知受影響的用戶及相關監管機構。{" "}
        </li>
      </ul>

      <div className="font-bold  ">數據保留與刪除 </div>
      <div className="font-bold ">我們會根據以下標準保留和刪除用戶數據： </div>
      <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
        <li style={{ listStyle: "disc" }}>
          數據保留期限：我們僅在提供服務所需的時間內保留個人數據，除非法律要求延長保留時間。通常情況下，當您的帳戶不活躍一段時間後，我們將自動刪除您的數據。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          數據刪除請求：您可以隨時請求刪除個人信息。請通過我們的網站或客服渠道提交請求，我們將在合理時間內處理並確認數據刪除，除非存在法律要求或合法業務需求需繼續保留。{" "}
        </li>
      </ul>

      <div className="font-bold  "> 用戶用任與免責條款 </div>
      <div className="font-bold  ">
        {" "}
        用戶應對其帳戶的所有活動負責，包括但不限於以下內容：
      </div>
      <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
        <li style={{ listStyle: "disc" }}>
          帳戶安全：用戶應負責保密其帳戶的登錄信息，防止未經授權的訪問。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          服務中斷與責任限制：我們將盡力確保服務的穩定運營，但由於不可控因素（如自然災害、網絡攻擊等）導致的服務中斷，SportsArt
          不對因此產生的損失負責。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          用戶責任：用戶同意遵守這些條款，合理合法地使用服務，並對違反條款或法律的行為負責。{" "}
        </li>
      </ul>

      <div className="font-bold "> 兒童隱私與保護 </div>
      <div className="font-bold ">
        {" "}
        我們嚴格遵守《兒童在線隱私保護法案》（COPPA），並採取以下措施：{" "}
      </div>
      <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
        <li style={{ listStyle: "disc" }}>
          年齡限制：13歲以下的兒童不得使用我們的服務。如果我們發現某帳戶屬於13歲以下的用戶，我們將立即終止該帳戶並刪除相關數據。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          父母同意：如果平台允許13歲以下的兒童註冊，我們將通過合理的方式獲取父母或監護人的同意，以確保符合法律規定。{" "}
        </li>
      </ul>

      <div className="font-bold  "> 爭議解決與仲裁 </div>
      <div className="font-bold  ">
        {" "}
        如果您與我們之間產生法律爭議，我們將採取以下機制來解決：
      </div>
      <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
        <li style={{ listStyle: "disc" }}>
          仲裁條款：我們鼓勵用戶通過仲裁而不是通過法律訴訟解決爭端。具體仲裁詳情將根據您所在地的法律來定。{" "}
        </li>
        <li style={{ listStyle: "disc" }}>
          集體訴訟豁免：用戶同意放棄以集體訴訟形式提出索賠，所有爭議應以個人身份解決。{" "}
        </li>
      </ul>

      <div className="font-bold  ">更新通知 </div>
      <div className="font-bold  ">
        {" "}
        我們可能不時更新服務條款和隱私政策。當這些條款發生更改時，我們將通過以下方式通知您：
      </div>
      <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
        <li style={{ listStyle: "disc" }}>
          通知方式：通過電子郵件、應用內通知或我們網站上的公告告知您。繼續使用服務即表示您同意這些修改後的條款。{" "}
        </li>
      </ul>

      <div className="font-bold  ">結論</div>
      <div className="">
        {" "}
        繼續使用 SportsArt
        PowrPlus，即表示您確認接受這些服務條款和隱私政策。如果您有任何問題或疑慮，請通過平台上的相應渠道與我們聯繫。
      </div>
      <details className="mt-[30rem]">
              <summary>第三方開源套件</summary> <LicenseInfo />
            </details>
    </div>
  );
}
export function FAQZh() {
  return (
    <>
      {" "}
      <div className="flex font-['Open_Sans']  text-[14rem] font-bold  ">
        常見問題
      </div>
      <br></br>
      <div className="mb-[10rem] text-[14rem]">
        Q: 如何使用掃描機台的 QR 碼？
      </div>
      <div className=" text-[14rem]">
        A: 打開手機的 QR 碼掃描程式，掃描機台綠色底的 QR
        碼，然後按下螢幕上顯示的連結即可進入網站。
      </div>
      <br />
      <br />
      <div className=" mb-[10rem] text-[14rem]">
        Q: 如果我之前沒有註冊記錄該怎麼辦？
      </div>
      <div className=" text-[14rem]">
        A: 如果之前沒有註冊記錄，系統會要求您先註冊才能使用。
      </div>
      <br />
      <br />
      <div className=" mb-[10rem] text-[14rem]">
        Q: 如果我已經註冊過，會發生什麼?
      </div>
      <div className=" text-[14rem]">
        A: 如果您已經有註冊帳號，當您掃描 QR 碼後，系統會直接帶您進入記錄畫面。
      </div>
    </>
  );
}
//!four pages end
export function CookieConsentZh() {
  return (
   <><p className="font-normal text-gray-700 dark:text-gray-400">
   這個網站會在您的電腦上儲存 cookies。這些 cookies
   用於收集您與我們網站互動的信息，並讓我們記住您。我們使用這些信息來改善和定制您的瀏覽體驗，並進行網站和其他媒介的分析和度量。要了解我們使用的
   cookies，請參見我們的隱私政策。
   <br />
   <br />
   如果您拒絕，您的信息在訪問此網站時將不會被追蹤。您的瀏覽器中將使用一個單一的
   cookie 來記住您選擇不被追蹤的偏好。
   <br />
   <br />
   SPORTSART
   擁有廣泛的經銷商和分銷商網絡。我們提醒我們的網站訪問者避免假冒網站。如果您對經銷商與
   SPORTSART 的關係有任何疑問，請通過我們的聯絡頁面提交查詢。
 </p></>
  );
}


