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
- 병렬 데이터 패칭: 병렬로 시작하는 것
  - Promise.all() || Promise.allSettled()
  - 위와 같은 방식은 모든 데이터를 동시에 가지고 온다. 즉 속도가 빠르다.
  - 하지만 각 요청의 처리가 다르다면?

# 정적 랜더링

- 데이터 패칭 및 랜더링은 빌드시점 || 데아터 재검증시 서버에서 발생
- 매번 데이터를 업데이트하지않고, 캐싱되어 캐시된 결과를 제공
- 더 빠른 기능, 서버부하 감소, seo
- seo: 사전에 랜더링된 콘텐츠는 페이지가 로드시에도 이미 사용가능하기때문에, 검색엔진 크롤러가 색인이 쉬움
- 데이터가 없거나, 자주변경되지 않거나, 모든 사용자에게 동일한 데이터를 보여줄때 유리

# 동적 랜더링

- 요청시간에 각 사용자에 대한 콘텐츠가 실시간으로 업데이트
- 실시간데이터, 사용자별 콘텐츠, 요청시간 정보(쿠키,url검색매개변수) 등이 유리
- 데이터 병렬처리시: 가장 느린 데이터 속도에 따라 전체적인 성능이 결정됨: 스트리밍을 통해 개선

# 스트리밍

- 경로를 더 작은 조각으로 나누어 데이터가 준비시 서버->클라이언트로 점진적 스트리밍 하는 전송기술
- 서버가 데이터를 준비후 완료된 html조각을 클라이언트에게 점진적 전송하는 방식
- 서버컴포넌트와 클라이언트 컴포넌트가 적절히 혼합됨
- 구현방법: laoding.tsx / <Suspense>

### laoding.tsx

- 데이터가 완료되어 전송되기전에 화면에 랜더링할 페이지
- uri가 되는 폴더에 page.tsx랑 같은 경로에 생성하면 해당uri에 로딩창생성

### Suspense

- 리액트기능
- 일부 조건이 충족될 때까지(예: 데이터가 로드됨) 애플리케이션의 렌더링 부분을 연기
- 데이터를 비동기적으로 로드시에 사용
- 리액트이므로 브라우저에서 리액트가 초기화(실행완료)되어야 작동

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

### input

- <input onChange={(e) => {handleSearch(e.target.value)}}/> 문제점은 타이핑때마다가 기록
- 해결법: 디바운싱(속도를 제한): 타이핑을 멈췄을때만
