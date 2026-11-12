// ===== 1. Nút đổi giao diện sáng/tối =====
const nutDoiMau = document.getElementById("doi-mau");

// Hàm áp dụng chế độ: true là sáng, false là tối
function datCheDo(sang) {
  document.body.classList.toggle("sang", sang);
  nutDoiMau.textContent = sang ? "☀" : "☾";
}

// Đọc lựa chọn đã lưu từ lần trước (nếu có)
let daLuu = null;
try {
  daLuu = localStorage.getItem("che-do");
} catch (loi) {
  // Trình duyệt chặn localStorage thì bỏ qua, trang vẫn chạy bình thường
}
datCheDo(daLuu === "sang");

// Mỗi lần bấm nút: đảo chế độ và lưu lại
nutDoiMau.addEventListener("click", () => {
  const dangSang = !document.body.classList.contains("sang");
  datCheDo(dangSang);
  try {
    localStorage.setItem("che-do", dangSang ? "sang" : "toi");
  } catch (loi) {}
});

// ===== 2. Hiện dần các phần khi cuộn tới =====
const cacPhan = document.querySelectorAll(".reveal");

const quanSat = new IntersectionObserver((danhSach) => {
  danhSach.forEach((muc) => {
    if (muc.isIntersecting) {
      muc.target.classList.add("hien");
      quanSat.unobserve(muc.target); // hiện một lần rồi thôi theo dõi
    }
  });
}, { threshold: 0.15 });

cacPhan.forEach((phan) => quanSat.observe(phan));

// ===== 3. Năm hiện tại ở chân trang =====
document.getElementById("nam").textContent = new Date().getFullYear();
// ===== Game đoán số =====
const soNhap = document.getElementById("so-nhap");
const soThongBao = document.getElementById("so-thong-bao");
const soNutDoan = document.getElementById("so-doan");
const soNutMoi = document.getElementById("so-moi");

const TOI_DA_LUOT = 10;
let soBiMat, luot, soXong;

function soVanMoi() {
  soBiMat = Math.floor(Math.random() * 100) + 1;
  luot = 0;
  soXong = false;
  soNhap.value = "";
  soThongBao.textContent = "Đoán một số từ 1 đến 100. Bạn có " + TOI_DA_LUOT + " lượt.";
}

soNutDoan.addEventListener("click", () => {
  if (soXong) return;

  const so = Number(soNhap.value);
  if (!Number.isInteger(so) || so < 1 || so > 100) {
    soThongBao.textContent = "Hãy nhập một số nguyên từ 1 đến 100.";
    return;
  }

  luot++;
  if (so === soBiMat) {
    soThongBao.textContent = "Đúng rồi, sau " + luot + " lượt.";
    soXong = true;
  } else if (luot === TOI_DA_LUOT) {
    soThongBao.textContent = "Hết lượt. Số bí mật là " + soBiMat + ".";
    soXong = true;
  } else {
    const goiY = so < soBiMat ? "Thấp quá" : "Cao quá";
    soThongBao.textContent = goiY + ". Còn " + (TOI_DA_LUOT - luot) + " lượt.";
  }
  soNhap.value = "";
});

soNutMoi.addEventListener("click", soVanMoi);
soVanMoi();
// ===== Game đoán chữ =====
const DS_TU = ["banana", "laptop", "window", "guitar", "pencil"];

const chuHienThi = document.getElementById("chu-hien-thi");
const chuThongBao = document.getElementById("chu-thong-bao");
const chuBanPhim = document.getElementById("chu-ban-phim");
const chuNutMoi = document.getElementById("chu-moi");

let biMat, hienThi, conLai, chuXong;

function chuVanMoi() {
  biMat = DS_TU[Math.floor(Math.random() * DS_TU.length)];
  hienThi = "_".repeat(biMat.length).split("");
  conLai = 15;
  chuXong = false;
  veBanPhim();
  capNhatChu();
}

function veBanPhim() {
  chuBanPhim.innerHTML = "";
  for (const c of "abcdefghijklmnopqrstuvwxyz") {
    const nut = document.createElement("button");
    nut.textContent = c;
    nut.addEventListener("click", () => doanChu(c, nut));
    chuBanPhim.appendChild(nut);
  }
}

function doanChu(c, nut) {
  if (chuXong) return;
  nut.disabled = true;

  let trung = false;
  for (let i = 0; i < biMat.length; i++) {
    if (biMat[i] === c) {
      hienThi[i] = c;
      trung = true;
    }
  }
  if (!trung) conLai--;
  capNhatChu();
}

function capNhatChu() {
  chuHienThi.textContent = hienThi.join(" ");

  if (hienThi.join("") === biMat) {
    chuThongBao.textContent = "Bạn thắng!";
    chuXong = true;
  } else if (conLai === 0) {
    chuThongBao.textContent = "Bạn thua. Từ đó là " + biMat + ".";
    chuXong = true;
  } else {
    chuThongBao.textContent = "Còn " + conLai + " mạng.";
  }
}

chuNutMoi.addEventListener("click", chuVanMoi);
chuVanMoi();
// ===== Kỹ năng: bấm vào để xem chi tiết =====
// Mỗi kỹ năng là một mục trong đối tượng này. Sửa số liệu cho đúng với bạn.
const KY_NANG = {
  "C++": {
    cap: "Cơ bản",
    phanTram: 35,
    daHoc: [
      "Biến, kiểu dữ liệu và nhập xuất với cin, cout",
      "Rẽ nhánh if / else và vòng lặp for, while",
      "Hàm, vector và chuỗi std::string",
      "Sinh số ngẫu nhiên, kiểm tra dữ liệu nhập"
    ],
    duAn: "Đã dùng trong: Game đoán số, Game đoán chữ"
  },
  "HTML": {
    cap: "Cơ bản",
    phanTram: 40,
    daHoc: [
      "Khung trang với head, body, section, nav, article",
      "Liên kết nội bộ bằng href và id",
      "Ô nhập, nút bấm và biểu mẫu đơn giản"
    ],
    duAn: "Đã dùng trong: Trang cá nhân"
  },
  "CSS": {
    cap: "Cơ bản",
    phanTram: 30,
    daHoc: [
      "Biến màu và đổi giao diện sáng tối",
      "Bố cục bằng flex và grid",
      "Hiệu ứng khi rê chuột, transition",
      "Responsive với @media"
    ],
    duAn: "Đã dùng trong: Trang cá nhân"
  },
  "JavaScript": {
    cap: "Mới bắt đầu",
    phanTram: 25,
    daHoc: [
      "Chọn phần tử bằng getElementById",
      "Bắt sự kiện click bằng addEventListener",
      "Mảng, vòng lặp và hàm",
      "Lưu lựa chọn bằng localStorage"
    ],
    duAn: "Đã dùng trong: Trang cá nhân, hai game trên web"
  },
  "VS Code": {
    cap: "Cơ bản",
    phanTram: 40,
    daHoc: [
      "Mở thư mục, tạo file, dùng terminal tích hợp",
      "Biên dịch và chạy chương trình C++",
      "Mở trang bằng Live Server"
    ],
    duAn: "Dùng cho mọi dự án ở trên"
  },
  "Git": {
    cap: "Mới bắt đầu",
    phanTram: 5,
    daHoc: [
      "Chưa học. Mục tiêu tiếp theo: đưa trang này lên GitHub Pages"
    ],
    duAn: "Chưa dùng trong dự án nào"
  }
};

const dsKyNang = document.getElementById("ds-ky-nang");
const knTen = document.getElementById("kn-ten");
const knCap = document.getElementById("kn-cap");
const knThanh = document.getElementById("kn-thanh");
const knDaHoc = document.getElementById("kn-da-hoc");
const knDuAn = document.getElementById("kn-du-an");

function chonKyNang(ten, nutDuocBam) {
  const kn = KY_NANG[ten];

  knTen.textContent = ten;
  knCap.textContent = "Trình độ: " + kn.cap + " (" + kn.phanTram + "%)";
  knThanh.style.width = kn.phanTram + "%";
  knDuAn.textContent = kn.duAn;

  knDaHoc.innerHTML = "";
  for (const muc of kn.daHoc) {
    const li = document.createElement("li");
    li.textContent = muc;
    knDaHoc.appendChild(li);
  }

  // Chỉ nút vừa bấm có class "chon", các nút khác bị bỏ
  for (const nut of dsKyNang.children) {
    nut.classList.toggle("chon", nut === nutDuocBam);
  }
}

// Tạo một nút cho mỗi kỹ năng trong KY_NANG
for (const ten in KY_NANG) {
  const nut = document.createElement("button");
  nut.textContent = ten;
  nut.addEventListener("click", () => chonKyNang(ten, nut));
  dsKyNang.appendChild(nut);
}

// Mở sẵn kỹ năng đầu tiên để bảng không bị trống
dsKyNang.firstElementChild.click();
// ===== Dự án: bấm vào thẻ để xem code trong hộp nổi =====
const DU_AN = {
  "doan-so": {
    ten: "Game đoán số",
    ngonNgu: "C++",
    moTa: "Máy nghĩ ra một số từ 1 đến 100, người chơi có 7 lượt đoán. Đoạn dưới dùng vòng for để đếm lượt, rẽ nhánh if để báo cao hay thấp, và vòng while để bắt nhập lại khi gõ chữ thay vì số.",
    code: `
#include <iostream>
#include <random>

int main() {
    std::mt19937 rng(std::random_device{}());
    int bi_mat = std::uniform_int_distribution<int>(1, 100)(rng);

    for (int luot = 1; luot <= 7; ++luot) {
        int so;
        std::cout << "Doan: ";
        while (!(std::cin >> so)) {
            std::cin.clear();
            std::cin.ignore(1000, '\\n');
            std::cout << "Nhap mot so nguyen: ";
        }

        if (so == bi_mat) {
            std::cout << "Dung roi, sau " << luot << " luot" << std::endl;
            return 0;
        } else if (so < bi_mat) {
            std::cout << "Thap qua" << std::endl;
        } else {
            std::cout << "Cao qua" << std::endl;
        }
    }
    std::cout << "Het luot. So bi mat la " << bi_mat << std::endl;
}
`
  },

  "doan-chu": {
    ten: "Game đoán chữ",
    ngonNgu: "C++",
    moTa: "Máy chọn một từ trong vector, người chơi đoán từng chữ cái. Chữ đúng được điền vào chuỗi gạch dưới, chữ sai bị trừ một mạng trong tổng 6 mạng.",
    code: `
#include <iostream>
#include <random>
#include <string>
#include <vector>

int main() {
    std::vector<std::string> tu = {"banana", "laptop", "window", "guitar", "pencil"};
    std::mt19937 rng(std::random_device{}());
    std::string bi_mat = tu[rng() % tu.size()];
    std::string hien_thi(bi_mat.size(), '_');
    int con_lai = 6;

    while (con_lai > 0 && hien_thi != bi_mat) {
        std::cout << hien_thi << "  (con " << con_lai << " mang)" << std::endl;
        std::cout << "Doan mot chu: ";
        char chu;
        std::cin >> chu;

        bool trung = false;
        for (size_t i = 0; i < bi_mat.size(); ++i) {
            if (bi_mat[i] == chu) {
                hien_thi[i] = chu;
                trung = true;
            }
        }
        if (!trung) {
            --con_lai;
        }
    }

    if (hien_thi == bi_mat) {
        std::cout << "Ban thang! Tu do la " << bi_mat << std::endl;
    } else {
        std::cout << "Ban thua. Tu do la " << bi_mat << std::endl;
    }
}
`
  },

  "trang-ca-nhan": {
    ten: "Trang cá nhân",
    ngonNgu: "HTML · CSS · JavaScript",
    moTa: "Trang bạn đang xem. HTML dựng nội dung, CSS đổi màu bằng biến, JavaScript xử lý nút đổi giao diện sáng tối và nhớ lựa chọn bằng localStorage. Dưới đây là ba mảnh nhỏ của nó.",
    code: `
/* CSS: biến màu, body.sang ghi đè khi chuyển sang nền sáng */
:root {
  --nen: #0f1115;
  --chu: #e8e8ea;
}
body.sang {
  --nen: #f6f7fb;
  --chu: #1b1d24;
}
body {
  background: var(--nen);
  color: var(--chu);
}

// JavaScript: bấm nút thì đảo class "sang" trên body
const nut = document.getElementById("doi-mau");
nut.addEventListener("click", () => {
  document.body.classList.toggle("sang");
});

// JavaScript: lưu lựa chọn để lần sau mở lại vẫn nhớ
localStorage.setItem("che-do", "sang");
`
  }
};

const hopPhu = document.getElementById("hop-phu");
const hopTen = document.getElementById("hop-ten");
const hopNgonNgu = document.getElementById("hop-ngon-ngu");
const hopMoTa = document.getElementById("hop-mo-ta");
const hopCode = document.getElementById("hop-code");
const hopChep = document.getElementById("hop-chep");
const hopDong = document.getElementById("hop-dong");

function moHop(id) {
  const da = DU_AN[id];
  hopTen.textContent = da.ten;
  hopNgonNgu.textContent = da.ngonNgu;
  hopMoTa.textContent = da.moTa;
  hopCode.textContent = da.code.trim();
  hopChep.textContent = "Sao chép code";
  hopPhu.hidden = false;
}

function dongHop() {
  hopPhu.hidden = true;
}

// Gắn sự kiện cho mọi thẻ có data-du-an
document.querySelectorAll("[data-du-an]").forEach((the) => {
  const id = the.dataset.duAn;
  the.addEventListener("click", () => moHop(id));
  the.addEventListener("keydown", (e) => {
    if (e.key === "Enter") moHop(id);
  });
});

// Ba cách đóng hộp: nút ×, bấm ra vùng tối bên ngoài, phím Escape
hopDong.addEventListener("click", dongHop);
hopPhu.addEventListener("click", (e) => {
  if (e.target === hopPhu) dongHop();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") dongHop();
});

// Nút sao chép
hopChep.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(hopCode.textContent);
    hopChep.textContent = "Đã sao chép";
  } catch (loi) {
    hopChep.textContent = "Không sao chép được";
  }
});