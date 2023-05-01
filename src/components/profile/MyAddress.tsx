export default function MyAddress() {
  return (
    <div>
      <div className="relative p-4 border-b-2 border-primary py-2">
        <div className="card-body my-3 shadow-lg bg-slate-100">
          <div className="flex -mx-6 space-x-2 justify-between">
            <div className="space-y-2">
              <div>
                <p>
                  <span className="text-sm font-medium">
                    Hoàng Thị Hồng Nhung
                  </span>{" "}
                  | <span>(+84) 393271417</span>
                </p>
              </div>
              <div className="">
                Cây Xăng, Xóm2 Diễn Phong Xã Diễn Phong, Huyện Diễn Châu, Nghệ
                An
              </div>
              <button className="btn btn-primary btn-outline btn-sm text-primary">
                Default
              </button>
            </div>
            <div className="space-x-2">
              <span className="text-sm text-primary hover:underline cursor-pointer">
                Update
              </span>
              <span className="text-sm text-primary hover:underline cursor-pointer">
                Delete
              </span>
            </div>
          </div>
        </div>
        <div className="cart ">
          <button className="btn btn-outline btn-success">+ Add new </button>
        </div>
      </div>
    </div>
  );
}
