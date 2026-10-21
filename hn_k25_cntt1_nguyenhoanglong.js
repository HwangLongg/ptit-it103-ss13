
let bookings = [
  {
    bookingCode: "CIN-001",
    customerName: "Nguyễn Văn An",
    movieTitle: "Ánh Trăng Cuối Phố",
    ticketCount: 2,
    pricePerTicket: 90000,
    totalAmount: 194400
  },
  {
    bookingCode: "CIN-002",
    customerName: "Trần Thị Bình",
    movieTitle: "Biệt Đội Sao Băng",
    ticketCount: 4,
    pricePerTicket: 90000,
    totalAmount: 349920
  },
  {
    bookingCode: "CIN-003",
    customerName: "Lê Minh Châu",
    movieTitle: "Mùa Hè Rực Lửa",
    ticketCount: 6,
    pricePerTicket: 110000,
    totalAmount: 641520
  }
];


function validateBookingCode(code) {
  if (code === "") return "Chưa nhập mã đặt vé";
  if (code.length < 6) return "Độ dài nhỏ hơn 6 ký tự";
  if (!code.startsWith("CIN-")) return 'Sai tiền tố "CIN-"';
  if (code.includes(" ")) return "Chứa khoảng trắng";

  if (findBookingIndex(code) !== -1) {
    return "Mã đặt vé đã tồn tại";
  }

  return "";
}


function findBookingIndex(code) {
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].bookingCode === code) {
      return i;
    }
  }

  return -1;
}


function inputPositiveInteger(message) {
  while (true) {
    const input = prompt(message);

    if (input === null) return null;

    const value = input.trim();
    const number = Number(value);

    if (value !== "" && Number.isInteger(number) && number > 0) {
      return number;
    }

    console.log("Vui lòng nhập số nguyên lớn hơn 0!");
  }
}


function calculateTotal(ticketCount, pricePerTicket) {
  const baseCost = ticketCount * pricePerTicket;
  let discount = 0;

  if (ticketCount >= 4) {
    discount = Math.round(baseCost * 0.1);
  }

  const serviceFee = Math.round((baseCost - discount) * 0.08);
  const totalAmount = baseCost - discount + serviceFee;

  return {
    baseCost: baseCost,
    discount: discount,
    serviceFee: serviceFee,
    totalAmount: totalAmount
  };
}

function formatName(name) {
  const words = name.trim().split(/\s+/);
  let result = [];

  for (let i = 0; i < words.length; i++) {
    result.push(
      words[i].charAt(0).toUpperCase() +
      words[i].slice(1).toLowerCase()
    );
  }

  return result.join(" ");
}

function inputName(message) {
  while (true) {
    const input = prompt(message);

    if (input === null) return null;

    const name = input.trim();

    if (name !== "") {
      return formatName(name);
    }

    console.log("Không được để trống!");
  }
}


function displayBookings(list) {
  if (list.length === 0) {
    console.log("Danh sách đơn đặt vé trống");
    return;
  }

  let revenue = 0;

  for (let i = 0; i < list.length; i++) {
    const booking = list[i];

    console.log(
      (i + 1) + ". " +
      booking.bookingCode + " - " +
      booking.customerName + " - " +
      booking.movieTitle +
      " | SL: " + booking.ticketCount +
      " | Giá: " + booking.pricePerTicket +
      " | Tổng TT: " + booking.totalAmount
    );

    revenue += booking.totalAmount;
  }

  console.log("Tổng: " + list.length + " đơn đặt vé");
  console.log("Doanh thu: " + revenue);
}


function displayMenu() {
  console.log("=====================================================");
  console.log("       HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA");
  console.log("=====================================================");
  console.log("1. Hiển thị danh sách đơn đặt vé");
  console.log("2. Thêm đơn đặt vé mới");
  console.log("3. Cập nhật đơn đặt vé");
  console.log("4. Xóa đơn đặt vé");
  console.log("5. Tìm kiếm đơn đặt vé theo tên phim");
  console.log("0. Thoát chương trình");
  console.log("=====================================================");
}

// In hoa don
function displayInvoice(booking, money) {
  console.log("========== HOA DON DAT VE ==========");
  console.log("Mã đặt vé: " + booking.bookingCode);
  console.log("Khách hàng: " + booking.customerName);
  console.log("Tên phim: " + booking.movieTitle);
  console.log("Số vé: " + booking.ticketCount);
  console.log("Giá mỗi vé: " + booking.pricePerTicket);
  console.log("Chi phí cơ sở: " + money.baseCost);
  console.log("Giảm giá: " + money.discount);
  console.log("Phí dịch vụ: " + money.serviceFee);
  console.log("Tổng thanh toán: " + money.totalAmount);
}


function addBooking() {
  let code = prompt("Nhập mã đặt vé:");

  if (code === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  code = code.trim().toUpperCase();

  const error = validateBookingCode(code);

  if (error !== "") {
    console.log("Lỗi: " + error);
    return;
  }

  const customerName = inputName("Nhập tên khách hàng:");

  if (customerName === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  const movieTitle = inputName("Nhập tên phim:");

  if (movieTitle === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  const ticketCount = inputPositiveInteger("Nhập số vé:");

  if (ticketCount === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  const pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé:");

  if (pricePerTicket === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  const money = calculateTotal(ticketCount, pricePerTicket);

  const booking = {
    bookingCode: code,
    customerName: customerName,
    movieTitle: movieTitle,
    ticketCount: ticketCount,
    pricePerTicket: pricePerTicket,
    totalAmount: money.totalAmount
  };

  bookings.push(booking);

  console.log("Thêm đơn đặt vé thành công!");
  displayInvoice(booking, money);
}


function updateBooking() {
  let code = prompt("Nhập mã đặt vé cần cập nhật:");

  if (code === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  code = code.trim().toUpperCase();

  const index = findBookingIndex(code);

  if (index === -1) {
    console.log("Không tìm thấy đơn đặt vé có mã " + code);
    return;
  }

  const ticketCount = inputPositiveInteger("Nhập số vé mới:");

  if (ticketCount === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  const pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé mới:");

  if (pricePerTicket === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  const oldTotal = bookings[index].totalAmount;
  const money = calculateTotal(ticketCount, pricePerTicket);

  bookings[index].ticketCount = ticketCount;
  bookings[index].pricePerTicket = pricePerTicket;
  bookings[index].totalAmount = money.totalAmount;

  console.log("Cập nhật thành công!");
  console.log("Tổng thanh toán cũ: " + oldTotal);
  console.log("Tổng thanh toán mới: " + money.totalAmount);
}


function deleteBooking() {
  let code = prompt("Nhập mã đặt vé cần xóa:");

  if (code === null) {
    console.log("Đã hủy thao tác xóa");
    return;
  }

  code = code.trim().toUpperCase();

  const index = findBookingIndex(code);

  if (index === -1) {
    console.log("Không tìm thấy đơn đặt vé có mã " + code);
    return;
  }

  const confirmDelete = prompt("Xác nhận xóa? Nhập Y để đồng ý:");

  if (confirmDelete === null || confirmDelete.trim().toUpperCase() !== "Y") {
    console.log("Đã hủy thao tác xóa");
    return;
  }

  bookings.splice(index, 1);

  console.log("Xóa thành công, còn " + bookings.length + " đơn");
}


function searchBooking() {
  const keyword = prompt("Nhập tên phim cần tìm:");

  if (keyword === null || keyword.trim() === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }

  const result = [];
  const searchText = keyword.trim().toLowerCase();

  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].movieTitle.toLowerCase().includes(searchText)) {
      result.push(bookings[i]);
    }
  }

  if (result.length === 0) {
    console.log("Không tìm thấy đơn đặt vé phù hợp");
  } else {
    displayBookings(result);
  }
}


function main() {
  let choice;

  do {
    displayMenu();

    const input = prompt("Vui lòng nhập lựa chọn (0 - 5):");

    if (input === null || input.trim() === "") {
      console.log("Lựa chọn không hợp lệ!");
      choice = -1;
    } else {
      choice = Number(input.trim());

      if (!Number.isInteger(choice) || choice < 0 || choice > 5) {
        console.log("Lựa chọn không hợp lệ!");
        choice = -1;
      }
    }

    switch (choice) {
      case 1:
        displayBookings(bookings);
        break;
      case 2:
        addBooking();
        break;
      case 3:
        updateBooking();
        break;
      case 4:
        deleteBooking();
        break;
      case 5:
        searchBooking();
        break;
      case 0:
        console.log("Cảm ơn bạn đã sử dụng chương trình!");
        break;
      case -1:
        break;
      default:
        console.log("Lựa chọn không hợp lệ!");
        break;
    }
  } while (choice !== 0);
}

main();
