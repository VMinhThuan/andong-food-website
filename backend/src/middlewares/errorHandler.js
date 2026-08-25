export function errorHandler(err, req, res, next) {
  console.error('[Error Handler]', err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Đã xảy ra lỗi máy chủ nội bộ. Vui lòng thử lại sau.';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Không tìm thấy tài nguyên: ${req.method} ${req.originalUrl}`
  });
}
