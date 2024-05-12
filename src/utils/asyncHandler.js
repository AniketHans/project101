//This is used as a wrapper of the functions.

//Using try-catch method
// export function asyncHandler(func) {
//     return async function run(req, res, next) {
//         try {
//             await func(req, res, next);
//         } catch (error) {
//             res.status(error.code || 500).json({
//                 success: false,
//                 message: error.message,
//             });
//         }
//     };
// }

//Using Promises
export function asyncHandler(func) {
    return function (req, res, next) {
        Promise.resolve(func(req, res, next)).catch((err) => next(err));
    };
}
