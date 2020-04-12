import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

export const successNotification = (message: string) => {
  Toast.fire({
    icon: 'success',
    title: message,
  });
};

export const errorNotification = (message: string) => {
  Toast.fire({
    icon: 'error',
    title: message,
  });
};

export const modalNotification = (message: string) => {
  Swal.fire({
    // position: 'top-end',
    icon: 'success',
    title: message,
    showConfirmButton: true,
    timer: 3000,
  });
};
