import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [submitting, setSubmitting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("");

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const statusValue = watch("status", post?.status || "active");
    const watchedImage = watch("image");

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // Watch for file selection changes and create local preview URL
    useEffect(() => {
        if (watchedImage && watchedImage[0]) {
            const file = watchedImage[0];
            setSelectedFileName(file.name);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);

            // Cleanup object URL on unmount or file change
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [watchedImage]);

    const submit = async (data) => {
        setSubmitting(true);
        setUploadingImage(true);
        try {
            if (post) {
                const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                setUploadingImage(false);

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);
                setUploadingImage(false);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (err) {
            console.error("Error submitting post:", err);
        } finally {
            setSubmitting(false);
            setUploadingImage(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-3">
            {/* Hidden Input to register status field */}
            <input type="hidden" {...register("status", { required: true })} />

            {/* Left Main Content Column */}
            <div className="w-full lg:w-2/3 px-3 space-y-6">
                <div>
                    <Input
                        label="Article Title :"
                        placeholder="Enter a compelling title..."
                        className="font-medium text-base text-white"
                        {...register("title", { required: true })}
                    />
                </div>
                <div>
                    <Input
                        label="URL Slug :"
                        placeholder="article-url-slug"
                        className="font-mono text-sm text-slate-300"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                </div>
                <div>
                    <RTE label="Article Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>

            {/* Right Sidebar Details Column */}
            <div className="w-full lg:w-1/3 px-3 mt-6 lg:mt-0 space-y-6">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
                        Publishing Settings
                    </h3>

                    {/* Image Selection & Upload Widget */}
                    <div className="space-y-3">
                        <Input
                            label="Featured Cover Image :"
                            type="file"
                            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl p-2 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />

                        {/* Image Preview & Upload Status Card */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 min-h-[160px] flex items-center justify-center">
                            
                            {/* Upload Progress Loader Overlay */}
                            {uploadingImage && (
                                <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-300">
                                    <div className="relative w-12 h-12 mb-3">
                                        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
                                        <div className="absolute inset-0 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                                    </div>
                                    <span className="text-xs font-bold text-white mb-1">Uploading Cover Image...</span>
                                    <span className="text-[10px] text-slate-400 font-mono">Transferring to Appwrite Storage</span>
                                </div>
                            )}

                            {/* Image Preview Render */}
                            {previewUrl ? (
                                <div className="w-full relative group">
                                    <img
                                        src={previewUrl}
                                        alt="Selected cover preview"
                                        className="w-full max-h-48 object-cover"
                                    />
                                    <div className="p-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs">
                                        <span className="flex items-center gap-1.5 text-emerald-400 font-medium truncate max-w-[180px]">
                                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {selectedFileName || "Image selected"}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-mono uppercase bg-slate-800 px-2 py-0.5 rounded">
                                            Ready to Upload
                                        </span>
                                    </div>
                                </div>
                            ) : post && post.featuredImage ? (
                                <div className="w-full">
                                    <img
                                        src={appwriteService.getFilePreview(post.featuredImage)}
                                        alt={post.title}
                                        className="w-full max-h-48 object-cover"
                                    />
                                    <div className="p-2 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 text-center">
                                        Current Saved Cover Image
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 text-center text-slate-500 space-y-2">
                                    <svg className="w-8 h-8 mx-auto text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-xs">No cover image selected yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Visibility Status Segmented Toggle */}
                    <div className="space-y-2">
                        <label className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-300 pl-1">
                            Visibility Status :
                        </label>
                        <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                            {/* Active Option */}
                            <button
                                type="button"
                                onClick={() => setValue("status", "active", { shouldValidate: true })}
                                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-500 ease-in-out cursor-pointer ${
                                    statusValue === "active"
                                        ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10"
                                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                                }`}
                            >
                                <span className={`w-2 h-2 rounded-full transition-all duration-500 ease-in-out ${statusValue === "active" ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
                                Active (Public)
                            </button>

                            {/* Inactive Option */}
                            <button
                                type="button"
                                onClick={() => setValue("status", "inactive", { shouldValidate: true })}
                                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-500 ease-in-out cursor-pointer ${
                                    statusValue === "inactive"
                                        ? "bg-amber-500/20 border border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/10"
                                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                                }`}
                            >
                                <span className={`w-2 h-2 rounded-full transition-all duration-500 ease-in-out ${statusValue === "inactive" ? "bg-amber-400" : "bg-slate-600"}`} />
                                Inactive (Draft)
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={submitting}
                        className={`w-full py-3.5 px-4 font-bold text-sm rounded-xl transition-all duration-500 ease-in-out shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                            post
                                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30"
                                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
                        }`}
                    >
                        {submitting ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                {uploadingImage ? "Uploading Cover Image..." : "Creating Article..."}
                            </span>
                        ) : post ? (
                            "Update Article"
                        ) : (
                            "Publish Article"
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}
