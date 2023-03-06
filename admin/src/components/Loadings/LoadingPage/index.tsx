import './loading.scss'

const LoadingPage = () => {
  return (
    <div className="w-screen h-screen">
      <div
        className={
          'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        }
      >
        <div id="outer">
          <div id="middle">
            <div id="inner"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
