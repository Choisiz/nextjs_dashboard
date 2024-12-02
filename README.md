# /app/lib

- 역할: 재사용 가능한 유틸리티함수, 애플리케이션에서 사용되는 함수
- placeholder-data.ts: 더미데이터

# /app/ui

- 역할: 모든ui구성요소(카드,테이블 등)

# 글꼴 최적화

- 파일을 가져와서 로드해야 하는 상황 => 성능영향
- 풀백 또는 시스템글꼴 로드 -> 사용자지정글꼴로 변경하는 과정시 레이아웃전환 => 이과정에서 텍스트크기,레이아웃간격 변경가능여부
- Next.js는 모듈 사용시 글꼴을 자동으로 최적화: next/font

1. 전통적인 글꼴 로딩 방식
   웹 애플리케이션에서 커스텀 글꼴을 사용할 때 일반적으로 웹에서 호스팅된 글꼴 파일(예: Google Fonts)을 가져옵니다.
   사용자가 페이지를 방문할 때 브라우저가 글꼴 파일을 외부 서버에서 다운로드합니다.
   이 다운로드 작업은 추가적인 네트워크 요청이 발생하므로, 페이지 로드 성능에 영향을 미칠 수 있습니다.
2. Next.js의 next/font가 해결하는 문제
   Next.js는 next/font를 통해 이러한 문제를 해결합니다:
   빌드 시 글꼴 다운로드
   next/font를 사용하면, Next.js는 빌드 과정에서 글꼴 파일을 미리 다운로드합니다.
   정적 자산으로 호스팅
   다운로드한 글꼴 파일을 Next.js 애플리케이션의 정적 자산으로 포함하여 배포합니다.
   (즉, 글꼴 파일이 사용자의 서버나 CDN에 직접 포함됩니다.)
   추가 네트워크 요청 제거
   사용자가 애플리케이션을 방문할 때, 브라우저는 외부 서버에서 글꼴을 가져올 필요 없이 애플리케이션에 포함된 파일을 사용합니다.
   이는 성능을 개선하고, 글꼴 로딩 속도를 최적화합니다.

# Image

- 이미지 로딩시 레이아웃이 자동으로 전환되는것 방지(레이아웃 시프트 방지)
  - 레이아웃 시프트: 이미지 로드중 레이아웃이 바뀌는현상(이미지로드시 크기없을시 공간을 어떻게
    배치해야할지 모르므로 텍스트 등 기타 요소들이 레이아웃이 바뀜)
- 작은 뷰포트를 가진 기기에 큰 이미지가 전송되는거 방지하고 이미지 크기조절
- 기본적 이미지 지연로딩: 보이는 시점만 이미지 로딩되는것, 스크롤로 이미지가 보이는 영역만
  - 기존에는 js를 이용해서 구현해야 했음
  - html5: <img loading="lazy">라는 속성이 추가되어 구현가능
- webp같은 최신이미지 제공

# 라우팅

- 각 폴더는 URL 경로 세그먼트
- page.tsx 는 경로와 연결된 홈페이지
- layout.tsx 는 여러 페이지에서 공유되는

# Link

- 전체 새로고침하지 않고 렌더링
- 프리페칭: 링크된 경로에 필요한 js, 데이터를 백그라운드에서 미리다운

# usePathname()

- url경로 알려줌
- const pathname = usePathname();

# React Server Components

- 데이터 페칭과 같은 비동기 작업에 대한 더 간단한 솔루션을 제공
- 시간이 많이 드는 데이터 가져오기 및 로직을 서버에서 처리하고 결과만 클라이언트로 전송
- 서버에서 실행되므로 추가 API 계층 없이도 데이터베이스를 직접 쿼리가능

# 데이터

- 워터풀방식: 순차적 실행
- 병렬 데이터 패칭: 워터풀방식의 반대, 병렬로 시작하는 것
  - Promise.all() || Promise.allSettled()
  - 위와 같은 방식은 모든 데이터를 동시에 가지고 온다. 즉 속도가 빠르다.
  - 워터풀의 문제인 병목점을 해결해준다
  - 하지만 각 요청의 처리가 다르다면?

# 정적 랜더링

- 데이터 패칭 및 랜더링은 빌드시점 || 데아터 재검증시 서버에서 발생
- 매번 데이터를 업데이트하지않고, 캐싱되어 캐시된 결과를 제공
- 더 빠른 기능, 서버부하 감소(캐시되므로), seo
- seo: 사전에 랜더링된 콘텐츠는 페이지가 로드시에도 이미 사용가능하기때문에, 검색엔진 크롤러가 색인이 쉬움
- 데이터가 없거나, 자주변경되지 않거나, 모든 사용자에게 동일한 데이터를 보여줄때 유리(블로그 등)
- 반면 정기적으로 업데이트되는 개인화된 데이터가 있는 대시보드에는 부적합

# 동적 랜더링

- 요청시간에 각 사용자에 대한 콘텐츠가 실시간으로 업데이트
- 실시간데이터, 사용자별 콘텐츠, 요청시간 정보(쿠키,url검색매개변수) 등이 유리
- 데이터 병렬처리시: 가장 느린 데이터 속도에 따라 전체적인 성능이 결정됨: 스트리밍을 통해 개선
- 동적렌더링을 사용한다면 가장 느린 데이터가 얼마나 빨리 로드되는지 여부에 따라 애플리케이션 속도가 결정됨 ㅜㅜ

# 스트리밍

- 동적랜더링의 문제점을 해결(가장 느린 데이터 속도가 애리케이션속도 결정)
- 느린 데이터 요청이 전체페이지를 차단하는 것을 방지 할수 있음
- 경로를 더 작은 조각으로 나누어 데이터가 준비시 서버->클라이언트로 점진적 스트리밍 하는 전송기술
- 서버가 데이터를 준비후 완료된 html조각을 클라이언트에게 점진적 전송하는 방식
- 서버컴포넌트와 클라이언트 컴포넌트가 적절히 혼합됨
- 구현방법: laoding.tsx / <Suspense>

### laoding.tsx

- 데이터가 완료되어 전송되기전에 화면에 랜더링할 페이지
- uri가 되는 폴더에 page.tsx랑 같은 경로에 생성하면 해당uri에 로딩창생성

### Suspense

- 리액트기능 즉 클라이언트컴포넌트
- 일부 조건이 충족될 때까지(예: 데이터가 로드됨) 애플리케이션의 렌더링 부분을 연기
- 데이터를 비동기적으로 로드시에 사용
- 리액트이므로 브라우저에서 리액트가 초기화(실행완료)되어야 작동

### 부분사전렌더링(PPR)

- Suspense기능을 서버측에서 사용하는 방식
- 렌더링 가능한 데이터는 바로 서버에서 제공-> 부분렌더링
- TTFB(Time to First Byte)개선

### Partial Prerendering

- 서버에서 미리 html생성후 필요한 부분만 로드
- Suspense를 활용해서 동적으로 데이터를 처리하면서 정적 콘텐츠를 미리  
  랜더링해서 빠르게 제공
- 클라이언트와 서버 모두 사용

# 검색 및 페이지 매김

### useSearchParams

- 현재 URL의 매개변수에 액세스가능
- ex) /dashboard/invoices?page=1&query=pending => 매개변수: {page: '1', query: 'pending'}
- ?를 기준으로 찾는다.
- &: 매개변수 구분자
- %: URL 인코딩된 문자를 해석해 처리.
- ^: 특별한 기능 없이 값의 일부로 간주.
- #: 클라이언트에서만 해석되고 매개변수로 전달되지 않음.
- URLSearchParams: 브라우저 내장클래스: 매개변수를 자동으로 쉽게 구분해주는 기능
  - get(key): 주어진 키에 해당하는 값 가져옴 (기준: =)
  - set(key, value): 주어진 키에 값을 설정, 매개변수 수정 (기준: =)
  - delete(key): 특정 키-값 쌍을 삭제
  - has(key): 특정 키존재여부(boolean)
  - append(key, value): 기존키에 새로운값 추가
  - toString(): 쿼리문자열로 변환

### usePathname

- 현재 URL의 경로 이름을 읽을 수 있다
- URL에서 ? 이전의 경로
- ex) /dashboard/invoices

### useRouter

### 디바운싱

- <input onChange={(e) => {handleSearch(e.target.value)}}/> 문제점은 타이핑때마다가 기록
- 해결법: 디바운싱(속도를 제한): 타이핑을 멈췄을때만
- pnpm i use-debounce

# 서버액션

- 비동기코드를 서버에서 직접실행
- 보안에 좋음( post요청, 클로저암호화, 엄격한 입력검사, 오류메세지 해싱, 호스트제한 등)
- 데이터 변형 또한 할 수 있을뿐만 아니라 revalidatePath를 사용하여 연관된 캐시를 다시 검증가능
- 리액트에서는 func create(){'use server', return ..} <form action={create}>...</form>; 을 통해 작업을 호출가능
- 서버액션 vs html
  - 서버액션은 자동으로 엔드포인트 생성, html은 개발자가 명시적 작성 (/api/submit)
  - 클라컴포넌트에서 서버액션 호출, html은 action을 통해 호출 <form action="/api/submit" method="POST">
  - 서버액션은 주로 백엔드서버가 별도로 존재하지 않고, db를 직접 연결시 사용, 즉 내부api연결이 많을 시 사용한다.
- 서버액션vs 서버컴포넌트
  | **특징** | **서버 컴포넌트(Server Components)** | **서버 액션(Server Actions)** |
  |--------------------------|---------------------------------------------------|-------------------------------------------------------|
  | **주요 목적** | 초기 렌더링 및 데이터 가져오기 | 사용자 상호작용 및 서버에서 비동기 작업 처리 |
  | **실행 위치** | 서버에서 실행 | 클라이언트에서 호출되지만 서버에서 실행 |
  | **사용 시점** | 주로 페이지 렌더링 시 사용 | 폼 제출, 버튼 클릭 등 이벤트 핸들링 시 사용 |
  | **클라이언트 지원** | 클라이언트에서 직접 호출 불가 | 클라이언트 컴포넌트에서 호출 가능 |
  | **데이터 전송 방식** | 서버에서 클라이언트로 HTML만 전송 | 브라우저에서 서버로 데이터를 전송 |
  | **필요한 선언** | 선언 필요 없음 | `"use server"` 선언 필요 |
- ch
  - <form /> 은 보통 name속성기반으로 데이터를 가지고온다.
- 데이터값과 db값 타입검증: zod 라이브러리 추천

# 에러처리

- error.tsx
- "use client";
- error, reset 인자
- not-found.tsx

# 접근성

- package.json -> scripts -> "lint": "next lint": 텍스트없는 이미지시 경고표시
- 양식검증 클라이언트: required
- 양식검증 서버: required

# 인증

- pnpm i next-auth@beta
- openssl rand -base64 32: 애플리케이션 비밀키 생성
- auth.js: 인증 코드를 모아둔 파일, 해당 파일을 제공해줘 해당코드안에 인증방식을 구현, 즉 인증로직을 미리 구현해놓은 라이브러리
- Oauth: 애플리케이션에서 직접 관리하지 않고 구글,네이버 등이 대신 인증을 처리해주는 방식, 즉 인증방식 중 하나 : 인증표준
- Passport: 인증라이브러리, oauth, 로컬로그인 등을 쉽게 구현하도록 도와주는 라이브러리
  - 어떤 방식의 인증을 쓸것인지, 실패/성공 등 처리지원
- NextAuth: Passport를 대신할수 있는 라이브러리
- 처리방식
  사용자가 "구글로 로그인" 버튼을 클릭 → 서버에 요청.
  서버에서 auth.js가 Passport의 "구글 OAuth 전략"을 호출.
  Passport는 OAuth 표준을 따라 구글로 인증 요청을 보냄.
  구글에서 인증을 완료하면 다시 Passport로 돌아와서 사용자 정보를 auth.js에 전달.
  auth.js는 로그인 성공 후 사용자에게 대시보드로 이동시킴.

# 메타데이터

- 웹페이지에 대한 추가 세부정보
- <head>에 내장되어 백그라운드에 작동하며 페이지를 방문하는 사용자에게는 보이지 않는다
- seo향상에 도움이 되는 기술
- 종류
  - 제목데이터: <title>
  - 설명데이터: <meta name="description" content="A brief description of the page content." />
  - 키워드데이터: <meta name="keywords" content="keyword1, keyword2, keyword3" />
  - 오픈 그래프 메타데이터: <meta property="og:title" content="Title Here" /> 제목, 설명, 미리보기 제공
  - 파비콘데이터: <link rel="icon" href="path/to/favicon.ico" />
- 메타데이터는 그것을 상속하는 모든 페이지에서 상속된다.
